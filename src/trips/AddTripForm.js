import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTrip } from '../actions/tripActions';
import Navbar from '../app/Navbar';
import { Form, Button, Rating } from 'semantic-ui-react';
import { GM_GEO_KEY } from '../config.js';
import '../stylesheets/trip.css';

let debounceFetch;

const defaultDestinationObj = {
	name: '',
	description: '',
	arrival: '',
	departure: '',
	lat: 0,
	lng: 0
};

const defaultState = {
	name: '',
	description: '',
	startDate: '',
	endDate: '',
	duration: '',
	ratings: 0,
	destinations: [defaultDestinationObj]
};

class AddTripForm extends Component {
	state = defaultState;

	handleTripChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addDestinationField = e => {
		if (this.state.destinations[this.state.destinations.length - 1].name) {
			this.setState({
				destinations: [...this.state.destinations, defaultDestinationObj]
			});
		}
	};

	removeDestinationField = index => () => {
		this.setState({
			destinations: [...this.state.destinations].filter((d, i) => i !== index)
		});
	};

	handleDestinationChange = index => e => {
		clearTimeout(debounceFetch);
		debounceFetch = setTimeout(this.fetchLatLng(e.target.value, index), 2000);
		const newDestinations = this.state.destinations.map(
			(d, i) => (i !== index ? d : { ...d, [e.target.name]: e.target.value })
		);
		this.setState({ destinations: newDestinations });
	};

	fetchLatLng = (address, index) => {
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GM_GEO_KEY}`
		)
			.then(res => res.json())
			.then(json => {
				if (json.results.length) {
					const newDestinationsWithLatLng = this.state.destinations.map(
						(d, i) =>
							i !== index
								? d
								: {
										...d,
										lat: json.results[0].geometry.location.lat.toFixed(3),
										lng: json.results[0].geometry.location.lng.toFixed(3)
								  }
					);
					this.setState({ destinations: [...newDestinationsWithLatLng] });
				}
			});
	};

	handleRatings = (e, { rating }) => this.setState({ ratings: rating });

	handleSubmit = e => {
		e.preventDefault();
		this.props.addTrip(this.state, this.props.history);
		this.setState(defaultState);
	};

	render() {
		return (
			<div>
				<Navbar history={this.props.history} />
				<h1 id="title">Add New Trip</h1>
				<Form onSubmit={this.handleSubmit} className="static-form">
					<Form.Group>
						<Form.Input
							name="name"
							placeholder="Trip Name"
							value={this.state.name}
							onChange={this.handleTripChange}
							width={16}
						/>
					</Form.Group>
					<Form.Group>
						<Form.TextArea
							name="description"
							placeholder="Trip Description"
							value={this.state.description}
							onChange={this.handleTripChange}
							width={16}
						/>
					</Form.Group>
					<Form.Group inline unstackable widths="equal">
						<Form.Input
							type="date"
							name="startDate"
							label="Start Date"
							value={this.state.startDate}
							onChange={this.handleTripChange}
						/>
						<Form.Input
							type="date"
							name="endDate"
							label="End Date"
							value={this.state.endDate}
							onChange={this.handleTripChange}
						/>
						Ratings:
						<Rating
							icon="star"
							maxRating={5}
							onRate={this.handleRatings}
							value={this.state.ratings}
						/>
					</Form.Group>
					<h3>Destinations</h3>
					{this.state.destinations.map((d, i) => (
						<Form.Group key={`destination ${i + 1}`}>
							<Form.Input
								name="name"
								value={d.name}
								placeholder={`Destination ${i + 1}`}
								onChange={this.handleDestinationChange(i)}
							/>
							<Form.Input
								name="description"
								value={d.description}
								placeholder="Description"
								onChange={this.handleDestinationChange(i)}
							/>
							<Form.Input
								type="date"
								name="arrival"
								value={this.state.destinations[i].arrival}
								selected={this.state.startDate}
								onChange={this.handleDestinationChange(i)}
							/>
							<Form.Input
								type="date"
								name="departure"
								value={this.state.destinations[i].departure}
								selected={this.state.endDate}
								onChange={this.handleDestinationChange(i)}
							/>
							<Button onClick={this.removeDestinationField(i)}>X</Button>
						</Form.Group>
					))}
					<a
						className="float-right-btn"
						role="button"
						onClick={this.addDestinationField}
						style={{ cursor: 'pointer' }}>
						Add another Destination
					</a>
					<Button primary type="submit">
						Add
					</Button>
				</Form>
				<Link to="/mytrips">Back</Link>
			</div>
		);
	}
}

export default connect(null, { addTrip })(AddTripForm);

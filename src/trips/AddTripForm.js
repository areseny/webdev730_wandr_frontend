import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrip } from '../actions/tripActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GM_GEO_KEY } from '../config.js';

let debounceFetch;

const defaultDestinationObj = {
	name: '',
	description: '',
	arrival: null,
	departure: null,
	lat: 0,
	lng: 0
};

const defaultState = {
	name: '',
	description: '',
	startDate: null,
	endDate: null,
	duration: '',
	ratings: 0,
	destinations: [defaultDestinationObj]
};

class AddTripForm extends Component {
	state = defaultState;

	destinationInputs = () =>
		this.state.destinations.map((d, i) => {
			return (
				<div key={`destination ${i + 1}`}>
					<input
						type="text"
						name="name"
						value={d.name}
						placeholder={`Destination ${i + 1}`}
						onChange={this.handleDestinationChange(i)}
					/>
					<br />
					<input
						type="text"
						name="description"
						value={d.description}
						placeholder={`Description for destination ${i + 1}`}
						onChange={this.handleDestinationChange(i)}
					/>
					<DatePicker
						placeholderText="Arriving on..."
						selected={this.state.destinations[i].arrival}
						onChange={this.handleArrivalInput}
						minDate={moment(this.state.startDate)}
						maxDate={moment(this.state.endDate)}
					/>
					<DatePicker
						placeholderText="Leaving on..."
						selected={this.state.destinations[i].departure}
						onChange={this.handleDepartureInput}
						minDate={moment(this.state.destinations[i].arrival)}
						maxDate={moment(this.state.endDate)}
					/>
					<input type="button" onClick={this.removeDestination(i)} value="X" />
				</div>
			);
		});

	handleTripChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleArrivalInput = day => {
		this.setState({
			destinations: [
				...this.state.destinations.slice(0, -1),
				{
					...this.state.destinations[this.state.destinations.length - 1],
					arrival: day
				}
			]
		});
	};

	handleDepartureInput = day => {
		this.setState({
			destinations: [
				...this.state.destinations.slice(0, -1),
				{
					...this.state.destinations[this.state.destinations.length - 1],
					departure: day
				}
			]
		});
	};

	addDestinationField = e => {
		if (this.state.destinations[this.state.destinations.length - 1].name) {
			this.setState({
				destinations: [...this.state.destinations, defaultDestinationObj]
			});
		}
	};

	removeDestination = index => () => {
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

	handleStartDateInput = day => {
		this.setState({ startDate: day });
	};

	handleEndDateInput = day => {
		// convert duration from seconds to days
		const duration = (day._d - this.state.startDate._d) / 86400000 + 1;
		this.setState({ endDate: day, duration: duration });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.addTrip(this.state);
		this.setState(defaultState);
	};

	render() {
		return (
			<div>
				<h3>Add New Trip</h3>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={this.state.name}
						onChange={this.handleTripChange}
					/>
					<br />
					<input
						type="text"
						name="description"
						placeholder="Description"
						value={this.state.description}
						onChange={this.handleTripChange}
					/>
					<DatePicker
						placeholderText="Start Date"
						selected={this.state.startDate}
						onChange={this.handleStartDateInput}
						minDate={moment(new Date())}
					/>
					<DatePicker
						placeholderText="End Date"
						selected={this.state.endDate}
						onChange={this.handleEndDateInput}
						minDate={moment(this.state.startDate)}
					/>
					{this.destinationInputs()}
					<input
						type="button"
						value="Enter Another Destination"
						onClick={this.addDestinationField}
					/>
					<br />
					Ratings:
					<select
						value={this.state.ratings}
						name="ratings"
						onChange={this.handleTripChange}>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<br />
					<input type="submit" value="Add" />
				</form>
				<button onClick={this.props.toggleAdd}>Collapse</button>
			</div>
		);
	}
}

export default connect(null, { addTrip })(AddTripForm);

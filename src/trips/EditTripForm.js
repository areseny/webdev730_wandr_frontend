import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTrip } from '../actions/tripActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GM_GEO_KEY } from '../config.js';

let debounceFetch;

class EditTripForm extends Component {
	state = {
		id: this.props.targetTrip.id,
		name: this.props.targetTrip.name,
		description: this.props.targetTrip.description,
		duration: this.props.targetTrip.duration,
		startDate: this.props.targetTrip.startDate,
		endDate: this.props.targetTrip.endDate,
		ratings: this.props.targetTrip.ratings,
		destinations: this.props.targetTrip.destinations
	};

	destinationInputs = () => {
		return this.state.destinations.map((d, i) => (
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
					minDate={moment(new Date(this.state.startDate))}
					maxDate={moment(new Date(this.state.endDate))}
				/>
				<DatePicker
					placeholderText="Leaving on..."
					selected={this.state.destinations[i].departure}
					onChange={this.handleDepartureInput}
					minDate={moment(new Date(this.state.destinations[i].arrival))}
					maxDate={moment(new Date(this.state.endDate))}
				/>
				<input type="button" onClick={this.removeDestination(i)} value="X" />
			</div>
		));
	};

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
		if (
			!this.state.destinations.length ||
			this.state.destinations[this.state.destinations.length - 1].name
		) {
			this.setState({
				destinations: [
					...this.state.destinations,
					{ name: '', description: '', lat: 0, lng: 0 }
				]
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

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleStartDateChange = day => {
		this.setState({ startDate: day });
	};

	handleEndDateChange = day => {
		// convert duration from seconds to days
		const duration = (day - new Date(this.state.startDate)) / 86400000 + 1;
		this.setState({ endDate: day, duration: duration });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.editTrip(this.state);
		this.props.toggleEdit();
	};

	render() {
		return (
			<div>
				<h3>Edit Trip</h3>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<br />
					<input
						type="text"
						name="description"
						value={this.state.description}
						onChange={this.handleChange}
					/>
					<DatePicker
						selected={moment(this.state.startDate)}
						onChange={this.handleStartDateChange}
					/>
					<DatePicker
						selected={moment(this.state.endDate)}
						onChange={this.handleEndDateChange}
						minDate={moment(this.state.startDate)}
					/>
					{this.destinationInputs()}
					<input
						type="button"
						value="Add Another Destination"
						onClick={this.addDestinationField}
					/>
					<select
						value={this.state.ratings}
						name="ratings"
						onChange={this.handleChange}>
						<option value="0">0</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<br />
					<input type="submit" value="Update" />
				</form>
				<button onClick={this.props.toggleEdit}>Back</button>
			</div>
		);
	}
}

export default connect(null, { editTrip })(EditTripForm);

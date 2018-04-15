import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editDestination } from '../actions/destActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GM_GEO_KEY } from '../config.js';

let debounceFetch;

class EditDestinationForm extends Component {
	state = {
		id: this.props.destination.id,
		name: this.props.destination.name,
		description: this.props.destination.description,
		lat: this.props.destination.lat,
		lng: this.props.destination.lng,
		arrival: this.props.destination.arrival,
		departure: this.props.destination.departure,
		activities: this.props.destination.activities
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleAddressChange = e => {
		clearTimeout(debounceFetch);
		debounceFetch = setTimeout(this.fetchLatLng(e.target.value), 10000);
		this.setState({ address: e.target.value });
	};

	fetchLatLng = address => {
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GM_GEO_KEY}`
		)
			.then(res => res.json())
			.then(
				json =>
					json.results.length
						? this.setState({
								lat: json.results[0].geometry.location.lat,
								lng: json.results[0].geometry.location.lng
						  })
						: this.setState({
								lat: 0,
								lng: 0
						  })
			);
	};

	handleStartTimeChange = e => {
		this.setState({ startTime: e._d.toISOString(), startTimeMoment: e });
	};

	handleEndTimeChange = e => {
		this.setState({ endTime: e._d.toISOString(), endTimeMoment: e });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.editActivity({ ...this.state, tripId: this.props.tripId });
		this.props.toggleEdit();
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name={d.name}
						value={d.name}
						onChange={this.handleDestinationChange(i)}
					/>
					<input
						type="text"
						name={d.description}
						value={d.description}
						onChange={this.handleDestinationChange(i)}
					/>
					<DatePicker
						selected={this.state.arrival}
						onChange={this.handleArrivalInput}
						minDate={moment(new Date(this.props.trip.startDate))}
						maxDate={moment(new Date(this.props.trip.endDate))}
					/>
					<DatePicker
						selected={this.state.departure}
						onChange={this.handleDepartureInput}
						minDate={moment(new Date(this.state.arrival))}
						maxDate={moment(new Date(this.state.endDate))}
					/>
					<input type="submit" value="Update" />
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	trip: state.trip.targetTrip
	// destination: state.trip.targetDestination
});

export default connect(null, { editDestination })(EditDestinationForm);

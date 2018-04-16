import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addActivity } from '../actions/actActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../stylesheets/activityForms.css';
import { GM_GEO_KEY } from '../config.js';

let debounceFetch;

let defaultState = {
	name: '',
	description: '',
	cost: '',
	startTime: null,
	endTime: null,
	address: '',
	lat: 0,
	lng: 0
};

class AddActivityForm extends Component {
	state = {
		id: this.props.targetTripId,
		destinationId: this.props.destinationId,
		...defaultState
	};

	handleAddressChange = e => {
		clearTimeout(debounceFetch);
		debounceFetch = setTimeout(this.fetchLatLng(e.target.value), 2000);
		this.setState({ address: e.target.value });
	};

	fetchLatLng = address => {
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GM_GEO_KEY}`
		)
			.then(res => res.json())
			.then(json => {
				return json.results.length
					? this.setState({
							lat: json.results[0].geometry.location.lat,
							lng: json.results[0].geometry.location.lng
					  })
					: this.setState({
							lat: 0,
							lng: 0
					  });
			});
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleStartTimeChange = e => {
		this.setState({ startTime: e });
	};

	handleEndTimeChange = e => {
		this.setState({ endTime: e });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.addActivity({ ...this.state });
		this.setState({ id: this.props.targetTripId, ...defaultState });
	};

	render() {
		return (
			<div>
				<h5>Add Activity</h5>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="description"
						placeholder="Description"
						value={this.state.description}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="address"
						placeholder="Address"
						value={this.state.address}
						onChange={this.handleAddressChange}
					/>
					<input
						type="number"
						name="cost"
						placeholder="Cost"
						value={this.state.cost}
						onChange={this.handleChange}
					/>
					<DatePicker
						placeholderText="Start Time"
						selected={this.state.startTime}
						onChange={this.handleStartTimeChange}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						dateFormat="LLL"
						timeCaption="time"
						minDate={moment(this.props.arrival)}
						maxDate={moment(this.props.departure)}
					/>
					<DatePicker
						placeholderText="End Time"
						selected={this.state.endTime}
						onChange={this.handleEndTimeChange}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						dateFormat="LLL"
						timeCaption="time"
						minDate={moment(this.state.startTime)}
						maxDate={moment(this.props.departure)}
					/>

					<input type="submit" value="Add Activity" />
				</form>
				<button onClick={this.props.toggleAdd}>Collapse</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	targetTripId: state.trip.targetTrip.id,
	arrival: state.trip.targetDestination.arrival,
	departure: state.trip.targetDestination.departure,
	destinationId: state.trip.targetDestination.id
});

export default connect(mapStateToProps, { addActivity })(AddActivityForm);

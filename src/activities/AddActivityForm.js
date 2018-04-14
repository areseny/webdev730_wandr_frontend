import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addActivity } from '../actions/actActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../stylesheets/activityForms.css';
import { GM_GEO_KEY } from '../config.js';

let debounceFetch;

class AddActivityForm extends Component {
	state = {
		id: this.props.targetTripId,
		name: '',
		description: '',
		cost: '',
		startTime: '',
		endTime: '',
		startTimeMoment: null,
		endTimeMoment: null,
		address: '',
		lat: 0,
		lng: 0,
		destinationName: ''
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
				debugger;
				return json.results.length
					? this.setState({
							lat: json.results[0].geometry.location.lat,
							lng: json.results[0].geometry.location.lng,
							destinationName: json.results[0].formatted_address
					  })
					: this.setState({
							lat: 0,
							lng: 0,
							destinationName: 'No where'
					  });
			});
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleStartTimeChange = e => {
		this.setState({ startTime: e._d.toISOString(), startTimeMoment: e });
	};

	handleEndTimeChange = e => {
		this.setState({ endTime: e._d.toISOString(), endTimeMoment: e });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.addActivity({ ...this.state });
		this.setState({
			name: '',
			description: '',
			cost: '',
			startTime: '',
			endTime: '',
			startTimeMoment: null,
			endTimeMoment: null,
			address: '',
			lat: 0,
			lng: 0
		});
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
						selected={this.state.startTimeMoment}
						onChange={this.handleStartTimeChange}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						dateFormat="LLL"
						timeCaption="time"
						minDate={moment(this.props.startDate)}
						maxDate={moment(this.props.endDate)}
					/>
					<DatePicker
						placeholderText="End Time"
						selected={this.state.endTimeMoment}
						onChange={this.handleEndTimeChange}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						dateFormat="LLL"
						timeCaption="time"
						minDate={this.state.startTimeMoment}
						maxDate={moment(this.props.endDate)}
					/>

					<input type="submit" value="Add Activity" />
				</form>
				<button onClick={this.props.toggleAdd}>Collapse</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	startDate: state.trip.targetTrip.startDate,
	endDate: state.trip.targetTrip.endDate
});

export default connect(mapStateToProps, { addActivity })(AddActivityForm);

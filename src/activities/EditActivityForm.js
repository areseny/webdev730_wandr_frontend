import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editActivity, deleteActivity } from '../actions/actActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../stylesheets/activityForms.css';
import { GM_GEO_KEY } from '../config.js';

let debounceFetch;

class EditActivityForm extends Component {
	state = {
		id: this.props.activity.id,
		name: this.props.activity.name,
		description: this.props.activity.description,
		startTimeMoment: moment(this.props.activity.startTime),
		endTimeMoment: moment(this.props.activity.endTime),
		startTime: this.props.activity.startTime,
		endTime: this.props.activity.endTime,
		cost: this.props.activity.cost,
		lat: this.props.activity.lat,
		lng: this.props.activity.lng,
		address: this.props.activity.address
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
		this.props.editActivity(this.state);
		this.props.toggleEdit();
	};

	handleDelete = () => {
		this.props.deleteActivity(this.props.activity.id, this.props.destinationId);
		this.props.toggleEdit();
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="description"
						value={this.state.description}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="address"
						value={this.state.address}
						onChange={this.handleAddressChange}
					/>
					<input
						type="number"
						name="cost"
						value={this.state.cost}
						onChange={this.handleChange}
					/>
					<DatePicker
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
					<input type="submit" value="Update" />
				</form>
				<button onClick={this.handleDelete}>Delete Activity</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	startDate: state.trip.targetTrip.startDate,
	endDate: state.trip.targetTrip.endDate
});

export default connect(mapStateToProps, { editActivity, deleteActivity })(
	EditActivityForm
);

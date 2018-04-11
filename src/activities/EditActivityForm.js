import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editActivity } from '../actions/actActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../stylesheets/addActivityForm.css';
// import { GM_GEO_KEY } from '../config.js';

class EditTripForm extends Component {
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
		console.log(this.state);
		return (
			<div>
				<h5>Edit Activity</h5>
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
						onChange={this.handleChange}
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
			</div>
		);
	}
}

export default connect(null, { editActivity })(EditTripForm);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTrip } from '../actions/tripActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditTripForm extends Component {
	state = {
		userTripId: this.props.trip.userTripId,
		name: this.props.trip.name,
		description: this.props.trip.description,
		startDate: this.props.trip.startDate,
		endDate: this.props.trip.endDate,
		duration: this.props.trip.duration,
		ratings: this.props.trip.ratings
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
					<input type="submit" value="Update" />
				</form>
				<button onClick={this.props.toggleEdit}>Collapse</button>
			</div>
		);
	}
}

export default connect(null, { editTrip })(EditTripForm);

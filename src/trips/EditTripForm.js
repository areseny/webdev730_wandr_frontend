import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editTrip } from '../actions/tripActions';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class EditTripForm extends Component {
	state = {
		id: this.props.trip.id,
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
					<DayPickerInput
						name="startDate"
						value={this.state.startDate}
						onDayChange={this.handleStartDateChange}
						dayPickerProps={{ todayButton: 'Today' }}
					/>
					<DayPickerInput
						name="endDate"
						value={this.state.endDate}
						onDayChange={this.handleEndDateChange}
						dayPickerProps={{ todayButton: 'Today' }}
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

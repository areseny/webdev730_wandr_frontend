import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrip } from '../actions/tripActions';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class AddTripForm extends Component {
	state = {
		name: '',
		description: '',
		startDate: '',
		endDate: '',
		duration: '',
		ratings: ''
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleStartDateInput = day => {
		this.setState({ startDate: day });
	};

	handleEndDateInput = day => {
		// convert duration from seconds to days
		const duration = (day - this.state.startDate) / 86400000 + 1;
		this.setState({ endDate: day, duration: duration });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.addTrip(this.state);
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
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="description"
						placeholder="Description"
						value={this.state.description}
						onChange={this.handleChange}
					/>
					<DayPickerInput
						placeholder="Start Date"
						name="startDate"
						value={this.state.startDate}
						onDayChange={this.handleStartDateInput}
						dayPickerProps={{ todayButton: 'Today' }}
					/>
					<DayPickerInput
						placeholder="End Date"
						name="endDate"
						value={this.state.endDate}
						onDayChange={this.handleEndDateInput}
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
					<input type="submit" value="Add Trip" />
				</form>
			</div>
		);
	}
}

export default connect(null, { addTrip })(AddTripForm);

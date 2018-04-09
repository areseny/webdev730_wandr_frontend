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
		duration: ''
	};

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleStartDateChange = day => {
		this.setState({ startDate: day });
	};

	handleEndDateChange = day => {
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
			<form onSubmit={this.handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={this.state.name}
					onChange={this.handleInputChange}
				/>
				<input
					type="text"
					name="description"
					placeholder="Description"
					value={this.state.description}
					onChange={this.handleInputChange}
				/>
				<DayPickerInput
					placeholder="Start Date"
					name="startDate"
					value={this.state.startDate}
					onDayChange={this.handleStartDateChange}
					dayPickerProps={{ todayButton: 'Today' }}
				/>
				<DayPickerInput
					placeholder="End Date"
					name="endDate"
					value={this.state.endDate}
					onDayChange={this.handleEndDateChange}
					dayPickerProps={{ todayButton: 'Today' }}
				/>
				<input type="submit" value="Add Trip" />
			</form>
		);
	}
}

export default connect(null, { addTrip })(AddTripForm);

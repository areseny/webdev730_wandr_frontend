import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addActivity } from '../actions/tripActions';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

class AddActivityForm extends Component {
	state = {
		name: '',
		description: '',
		cost: '',
		date: '',
		startTime: '',
		endTime: '',
		lat: '',
		lng: ''
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleDateInput = day => {
		this.setState({ startDate: day });
	};

	handleStartTimeInput = e => {
		this.setState({ startTime: e._d });
	};

	handleEndTimeInput = e => {
		this.setState({ endTime: e._d });
	};

	handleSubmit = e => {
		e.preventDefault();
		// this.props.addActivity(this.state);
	};

	render() {
		return (
			<div>
				<h3>Add Activity</h3>
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
						type="number"
						name="cost"
						placeholder="Cost"
						value={this.state.cost}
						onChange={this.handleChange}
					/>
					<DayPickerInput
						name="date"
						placeholder="Date"
						value={this.state.date}
						onDayChange={this.handleDateInput}
						dayPickerProps={{ todayButton: 'Today' }}
					/>
					<TimePicker
						placeholder="StartTime"
						showSecond={false}
						format="h:mm a"
						onChange={this.handleStartTimeInput}
						use12Hours
						inputReadOnly
					/>
					<TimePicker
						placeholder="EndTime"
						showSecond={false}
						format="h:mm a"
						onChange={this.handleEndTimeInput}
						use12Hours
						inputReadOnly
					/>
					<input
						type="text"
						name="address"
						placeholder="Address"
						value={this.state.address}
						onChange={this.handleChange}
					/>
					<input type="submit" value="Add Activity" />
				</form>
			</div>
		);
	}
}

export default connect(null)(AddActivityForm);

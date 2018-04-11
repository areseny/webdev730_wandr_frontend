import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTrip } from '../actions/tripActions';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class AddTripForm extends Component {
	state = {
		name: '',
		description: '',
		startDate: '',
		endDate: '',
		duration: '',
		ratings: '',
		startDateMoment: null,
		endDateMoment: null
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleStartDateInput = day => {
		this.setState({ startDate: day._d, startDateMoment: day });
	};

	handleEndDateInput = day => {
		// convert duration from seconds to days
		const duration = (day._d - this.state.startDate) / 86400000 + 1;
		this.setState({ endDate: day._d, endDateMoment: day, duration: duration });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.addTrip(this.state);
		this.setState({
			name: '',
			description: '',
			startDate: '',
			endDate: '',
			duration: '',
			ratings: '',
			startDateMoment: null,
			endDateMoment: null
		});
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
					<DatePicker
						placeholderText="Depart"
						selected={this.state.startDateMoment}
						onChange={this.handleStartDateInput}
					/>
					<DatePicker
						placeholderText="Return"
						selected={this.state.endDateMoment}
						onChange={this.handleEndDateInput}
						minDate={moment(new Date(this.state.startDate))}
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

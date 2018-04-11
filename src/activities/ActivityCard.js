import React, { Component } from 'react';
import moment from 'moment';
import EditActivityForm from './EditActivityForm';

export default class ActivityCard extends Component {
	state = { editing: false };

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	displayEditSection = () =>
		this.state.editing ? (
			<div>
				<EditActivityForm
					activity={this.props.activity}
					toggleEdit={this.toggleEdit}
					tripId={this.props.tripId}
				/>
			</div>
		) : (
			<button onClick={this.toggleEdit}>Edit Activity</button>
		);

	parseDateTime = () => {
		const st = moment(new Date(this.props.activity.start_time));
		const et = moment(new Date(this.props.activity.end_time));
		const date = st.format('LL');
		const startTime = st.format('LT');
		const endTime = et.format('LT');
		return { date, startTime, endTime };
	};

	render() {
		return (
			<div>
				{this.props.activity.name}
				<br />
				{this.props.activity.description}
				<br />
				Date: {this.parseDateTime().date}
				<br />
				From {this.parseDateTime().startTime} to {this.parseDateTime().endTime}
				<br />
				Address: {this.props.activity.address}
				<br />
				Cost: ${this.props.activity.cost}
				<br />
				{this.displayEditSection()}
				<button>Delete Activity</button>
			</div>
		);
	}
}

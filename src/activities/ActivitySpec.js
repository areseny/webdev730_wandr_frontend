import React, { Component } from 'react';
import moment from 'moment';
import { Card } from 'semantic-ui-react';
import '../stylesheets/activities.css';

export default class ActivitySpec extends Component {
	parseDateTime = () => {
		const st = moment(this.props.activity.startTime);
		const et = moment(this.props.activity.endTime);
		const date = st.format('LL');
		const startTime = st.format('LT');
		const endTime = et.format('LT');
		return { date, startTime, endTime };
	};

	constructDetails = () => (
		<div>
			{this.props.activity.description}
			<br />
			<strong>Date:</strong> {this.parseDateTime().date}
			<br />
			<strong>Address:</strong> {this.props.activity.address}
		</div>
	);

	constructTime = () => (
		<div>
			From {this.parseDateTime().startTime} to {this.parseDateTime().endTime}
			<br />
			${this.props.activity.cost}
		</div>
	);

	render() {
		return (
			<Card
				id="activity-spec"
				fluid
				color="grey"
				header={this.props.activity.name}
				meta={this.constructTime()}
				description={this.constructDetails()}
			/>
		);
	}
}

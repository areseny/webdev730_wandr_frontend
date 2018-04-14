import React, { Component } from 'react';
import moment from 'moment';

export default class ActivitySpec extends Component {
	parseDateTime = () => {
		const st = moment(this.props.activity.startTime);
		const et = moment(this.props.activity.endTime);
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
			</div>
		);
	}
}

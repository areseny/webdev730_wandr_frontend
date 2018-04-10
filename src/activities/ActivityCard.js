import React, { Component } from 'react';
import { GM_GEO_KEY } from '../config.js';
import * as moment from 'moment';

export default class ActivityCard extends Component {
	state = { address: '' };

	getAddress = () => {
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${
				this.props.lat
			},${this.props.lng}&key=${GM_GEO_KEY}`
		)
			.then(res => res.json())
			.then(
				json =>
					json.results[0] && json.results[0].formatted_address
						? json.results[0].formatted_address
						: 'Not Available'
			);
	};

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
				Address: {this.getAddress()}
				<br />
				Cost: ${this.props.activity.cost}
				<br />
				<button>Edit Activity</button>
				<button>Delete Activity</button>
			</div>
		);
	}
}

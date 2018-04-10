import React, { Component } from 'react';
import { GM_GEO_KEY } from '../config.js';

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
						? `Address: ${json.results[0].formatted_address}`
						: null
			);
	};

	parseTime = () => {
		console.log(this.props.activity);
		const st = new Date(this.props.activity.start_time);
		const et = new Date(this.props.activity.end_time);
		const date = st.toDateString();
		const startTime = st
			.toTimeString()
			.split(' ')[0]
			.slice(0, -3);
		const endTime = et
			.toTimeString()
			.split(' ')[0]
			.slice(0, -3);
		return { date, startTime, endTime };
	};

	render() {
		return (
			<div>
				{this.props.activity.name}
				<br />
				{this.props.activity.description}
				<br />
				Date: {this.parseTime().date}
				<br />
				From {this.parseTime().startTime} to {this.parseTime().endTime}
				<br />
				{this.getAddress()}
				<br />
				<button>Edit Activity</button>
				<button>Delete Activity</button>
			</div>
		);
	}
}

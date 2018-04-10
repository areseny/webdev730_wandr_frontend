import React, { Component } from 'react';
import ActivityCard from './ActivityCard';

export default class DestinationsContainer extends Component {
	displayActivities = () =>
		this.props.activities
			? this.props.activities.map((a, i) => (
					<li key={i}>
						<ActivityCard activity={a} />
					</li>
			  ))
			: null;

	render() {
		return (
			<div>
				<h3>Activities</h3>
				<ol>{this.displayActivities()}</ol>
			</div>
		);
	}
}

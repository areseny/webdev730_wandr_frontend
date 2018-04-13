import React, { Component } from 'react';
import ActivityCard from './ActivityCard';

export default class ActivitiesContainer extends Component {
	render() {
		return (
			<div>
				<ol>
					{this.props.targetTripActivities.map((a, i) => (
						<li key={i}>
							<ActivityCard activity={a} />
						</li>
					))}
				</ol>
			</div>
		);
	}
}

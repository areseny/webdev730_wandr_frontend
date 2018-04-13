import React, { Component } from 'react';
import moment from 'moment';
import ActivitiesContainer from '../activities/ActivitiesContainer';
import AddActivityForm from '../activities/AddActivityForm';

export default class TripContent extends Component {
	state = { addingActivity: false };

	toggleAddActivity = () => {
		this.setState({ addingActivity: !this.state.addingActivity });
	};

	render() {
		return (
			<div>
				Description: {this.props.targetTrip.description}
				<br />
				Timeline: from {moment(this.props.targetTrip.startDate).format('LL')} to
				{moment(this.props.targetTrip.endDate).format('LL')} ({
					this.props.targetTrip.duration
				}{' '}
				days)
				<br />
				Ratings: {this.props.targetTrip.ratings}
				<br />
				Destinations:
				{this.props.targetTrip.destinations.length ? (
					<ol>
						{this.props.targetTrip.destinations.map((d, i) => (
							<li key={i}>{d.name}</li>
						))}
					</ol>
				) : (
					'No destiantions have been added (yet...)'
				)}
				Activities:
				{this.props.targetTrip.activities.length ? (
					<ActivitiesContainer
						targetTripActivities={this.props.targetTrip.activities}
						targetTripId={this.props.targetTrip.id}
					/>
				) : (
					' No activities have been planned (yet...)'
				)}
				<br />
				{this.state.addingActivity ? (
					<AddActivityForm
						toggleAddActivity={this.toggleAddActivity}
						targetTripId={this.props.targetTrip.id}
						startDate={this.props.targetTrip.startDate}
						endDate={this.props.targetTrip.endDate}
					/>
				) : (
					<button onClick={this.toggleAddActivity}>Add Activity</button>
				)}
			</div>
		);
	}
}

// <ul>{props.targetTrip.activities.map((a, i) => <li key={i}>{a.name}</li>)}</ul>

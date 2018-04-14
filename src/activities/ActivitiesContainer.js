import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import AddActivityForm from './AddActivityForm';

export default class ActivitiesContainer extends Component {
	state = { addingActivity: false };

	toggleAddActivity = () => {
		this.setState({ addingActivity: !this.state.addingActivity });
	};

	render() {
		return (
			<div>
				<ul>
					{this.props.activities.map((a, i) => (
						<li key={i}>
							<ActivityCard
								activity={a}
								destinationId={this.props.destinationId}
							/>
						</li>
					))}
				</ul>
				<br />
				{this.state.addingActivity ? (
					<AddActivityForm
						toggleAddActivity={this.toggleAddActivity}
						destinationId={this.props.destinationId}
					/>
				) : (
					<button onClick={this.toggleAddActivity}>Add Activity</button>
				)}
			</div>
		);
	}
}

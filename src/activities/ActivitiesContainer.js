import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import AddActivityForm from './AddActivityForm';

export default class ActivitiesContainer extends Component {
	state = { addingActivity: false };

	toggleAdd = () => {
		this.setState({ addingActivity: !this.state.addingActivity });
	};

	render() {
		return (
			<div>
				{this.state.addingActivity ? (
					<AddActivityForm
						toggleAdd={this.toggleAdd}
						destinationId={this.props.destinationId}
					/>
				) : (
					<button onClick={this.toggleAdd}>Add Activity</button>
				)}
				<br />
				{this.props.activities.length
					? this.props.activities.map((a, i) => (
							<ActivityCard
								activity={a}
								key={i}
								destinationId={this.props.destinationId}
							/>
					  ))
					: 'No activity have been planned (yet...)'}
			</div>
		);
	}
}

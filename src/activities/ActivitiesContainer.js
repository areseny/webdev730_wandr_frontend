import React, { Component } from 'react';
import ActivityCard from './ActivityCard';
import AddActivityForm from './AddActivityForm';
import { Button, Icon } from 'semantic-ui-react';
import '../stylesheets/activities.css';

export default class ActivitiesContainer extends Component {
	state = { addingActivity: false };

	toggleAdd = () => {
		this.setState({ addingActivity: !this.state.addingActivity });
	};

	render() {
		return (
			<div id="activities-container">
				{this.state.addingActivity ? (
					<AddActivityForm
						toggleAdd={this.toggleAdd}
						destinationId={this.props.destinationId}
					/>
				) : (
					<a role="button" onClick={this.toggleAdd} className="float-right-btn">
						<Icon name="calendar plus icon" /> Add Activity
					</a>
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

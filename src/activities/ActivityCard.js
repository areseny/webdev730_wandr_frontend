import React, { Component } from 'react';
import EditActivityForm from './EditActivityForm';
import ActivitySpec from './ActivitySpec';
import '../stylesheets/activities.css';
import { List } from 'semantic-ui-react';

export default class ActivityCard extends Component {
	state = { editing: false };

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	render() {
		return (
			<div>
				{this.state.editing ? (
					<EditActivityForm
						activity={this.props.activity}
						tripId={this.props.tripId}
						toggleEdit={this.toggleEdit}
					/>
				) : (
					<List>
						<ActivitySpec
							activity={this.props.activity}
							toggleEdit={this.toggleEdit}
						/>
					</List>
				)}
			</div>
		);
	}
}

import React, { Component } from 'react';
import EditActivityForm from './EditActivityForm';
import ActivitySpec from './ActivitySpec';

export default class ActivityCard extends Component {
	state = { editing: false };

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	render() {
		return (
			<div>
				{this.state.editing ? (
					<div>
						<EditActivityForm
							activity={this.props.activity}
							tripId={this.props.tripId}
							toggleEdit={this.toggleEdit}
						/>
					</div>
				) : (
					<div>
						<ActivitySpec activity={this.props.activity} />
						<button onClick={this.toggleEdit}>Edit Activity</button>
					</div>
				)}
			</div>
		);
	}
}

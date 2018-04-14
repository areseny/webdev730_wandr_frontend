import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteActivity } from '../actions/actActions';
import EditActivityForm from './EditActivityForm';
import ActivitySpec from './ActivitySpec';

class ActivityCard extends Component {
	state = { editing: false };

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	handleDelete = () => {
		this.props.deleteActivity(this.props.activity.id, this.props.destinationId);
	};

	render() {
		return (
			<div>
				{this.state.editing ? (
					<div>
						<EditActivityForm
							activity={this.props.activity}
							tripId={this.props.tripId}
							toggleEdit={this.props.toggleEdit}
						/>
					</div>
				) : (
					<div>
						<ActivitySpec activity={this.props.activity} />
						<button onClick={this.toggleEdit}>Edit Activity</button>
					</div>
				)}
				<button onClick={this.handleDelete}>Delete Activity</button>
			</div>
		);
	}
}

export default connect(null, { deleteActivity })(ActivityCard);

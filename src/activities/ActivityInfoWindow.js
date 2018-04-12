import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { editActivity, deleteActivity } from '../actions/actActions';
import EditActivityForm from './EditActivityForm';

class ActivityInfoWindow extends Component {
	state = { activity: this.props.activity, editing: false };

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	displayEditSection = () =>
		this.state.editing ? (
			<div>
				<EditActivityForm
					editActivity={this.handleEdit}
					activity={this.state.activity}
					tripId={this.props.tripId}
				/>
			</div>
		) : (
			<button onClick={this.toggleEdit}>Edit Activity</button>
		);

	handleEdit = editedActivity => {
		this.setState({ activity: editedActivity });
		this.props.editActivity(editedActivity);
		this.toggleEdit();
	};

	parseDateTime = () => {
		const st = moment(this.state.activity.startTime);
		const et = moment(this.state.activity.endTime);
		const date = st.format('LL');
		const startTime = st.format('LT');
		const endTime = et.format('LT');
		return { date, startTime, endTime };
	};

	handleDelete = () => {
		this.props.deleteActivity(this.props.tripId, this.state.activity.id);
	};

	render() {
		return (
			<div>
				{this.state.activity.name}
				<br />
				{this.state.activity.description}
			</div>
		);
	}
}

export default connect(null, { editActivity, deleteActivity })(
	ActivityInfoWindow
);

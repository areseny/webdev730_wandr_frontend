import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActivityCard from './ActivityCard';
import AddActivityForm from './AddActivityForm';

class ActivitiesContainer extends Component {
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
				<AddActivityForm />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	activities: state.trip.trip.activities
});

export default connect(mapStateToProps)(ActivitiesContainer);

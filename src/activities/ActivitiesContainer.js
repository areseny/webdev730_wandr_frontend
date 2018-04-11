import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActivities } from '../actions/actActions';
import ActivityCard from './ActivityCard';
import AddActivityForm from './AddActivityForm';

class ActivitiesContainer extends Component {
	state = { tripId: this.props.tripId };

	componentDidMount() {
		this.props.fetchActivities(this.state.tripId);
	}

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
				<AddActivityForm tripId={this.state.tripId} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	activities: state.act.activities
});

export default connect(mapStateToProps, { fetchActivities })(
	ActivitiesContainer
);

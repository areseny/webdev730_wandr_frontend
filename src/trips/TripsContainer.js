import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUserTrips } from '../actions/tripActions';
import withAuth from '../app/withAuth';
import TripsList from './TripsList';

class TripsContainer extends Component {
	componentDidMount() {
		this.props.fetchUserTrips(this.props.history);
	}

	render() {
		return (
			<div>
				<h1>My Trips</h1>
				<TripsList trips={this.props.trips} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	trips: state.trip.userTrips
});

export default withRouter(
	connect(mapStateToProps, { fetchUserTrips })(withAuth(TripsContainer))
);

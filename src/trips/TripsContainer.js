import React, { Component } from 'react';
import TripsList from './TripsList';
import { fetchUserTrips } from '../actions/tripActions';
import { connect } from 'react-redux';
import AddTripForm from './AddTripForm';

class TripsContainer extends Component {
	componentDidMount() {
		this.props.fetchUserTrips(this.props.currentUser.id);
	}

	displayTrips = () =>
		this.props.trips.map((t, i) => (
			<li key={i}>
				<TripsList trip={t} />
			</li>
		));

	render() {
		return (
			<div>
				<ul>{this.displayTrips()}</ul>
				<AddTripForm />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	currentUser: state.auth.currentUser,
	trips: state.trip.userTrips
});

export default connect(mapStateToProps, { fetchUserTrips })(TripsContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchTrip, deleteTrip } from '../actions/tripActions';
import withAuth from '../app/withAuth';
import TripDashboard from './TripDashboard';
import ActivitiesContainer from '../activities/ActivitiesContainer';
import { GM_JS_KEY } from '../config.js';
import TripMap from './TripMap';
import '../stylesheets/tripMap.css';

class TripContainer extends Component {
	state = { tripId: this.props.match.params.id };

	componentDidMount() {
		this.props.fetchTrip(this.state.tripId);
	}

	handleDelete = () => {
		this.props.deleteTrip(this.props.tripId, this.props.history);
	};

	render() {
		console.log(this.props.trips);
		return (
			<div>
				<TripMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GM_JS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
					loadingElement={<div id="loading-element" />}
					containerElement={<div id="map-container" />}
					mapElement={<div id="map-element" />}
					activities={this.props.trip.activities}
				/>
				<br />
				<TripDashboard trip={this.props.trip} tripId={this.state.tripId} />
				<br />
				<Link to="/trips">Back</Link>
				<br />
				<ActivitiesContainer tripId={this.state.tripId} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	trip: state.trip.trip
});

export default withRouter(
	connect(mapStateToProps, { fetchTrip, deleteTrip })(withAuth(TripContainer))
);

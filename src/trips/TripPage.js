import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchTrip, deleteTrip } from '../actions/tripActions';
import withAuth from '../app/withAuth';
import { GM_JS_KEY } from '../config.js';
import TripDashboard from './TripDashboard';
import TripMap from './TripMap';
import '../stylesheets/tripMap.css';
import ActivitiesContainer from '../activities/ActivitiesContainer';
import ActivitySpec from '../activities/ActivitySpec';

class TripPage extends Component {
	state = {
		tripId: this.props.match.params.id,
		loaded: false
	};

	componentDidMount() {
		this.props.fetchTrip(this.state.tripId);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.trip.activities) {
			this.setState({ loaded: true });
		}
	}

	handleDelete = () => {
		this.props.deleteTrip(this.props.tripId, this.props.history);
	};

	render() {
		return (
			<div>
				{this.state.loaded ? (
					<TripMap
						activities={this.props.trip.activities}
						googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GM_JS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
						loadingElement={<div id="loading-element" />}
						containerElement={<div id="map-container" />}
						mapElement={<div id="map-element" />}
					/>
				) : (
					'Loading map...'
				)}
				<br />
				{this.props.targetActivity.key ? (
					<ActivitySpec
						activity={this.props.targetActivity}
						tripId={this.state.tripId}
					/>
				) : null}
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
	trip: state.trip.trip,
	targetActivity: state.act.targetActivity
});

export default withRouter(
	connect(mapStateToProps, { fetchTrip, deleteTrip })(withAuth(TripPage))
);

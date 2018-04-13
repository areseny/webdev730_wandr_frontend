import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setTargetTrip } from '../actions/tripActions';
import withAuth from '../app/withAuth';
import { GM_JS_KEY } from '../config.js';
import TripMap from './TripMap';
import TripDashboard from './TripDashboard';
import '../stylesheets/tripMap.css';
// import ActivitiesContainer from '../activities/ActivitiesContainer';
// import ActivitySpec from '../activities/ActivitySpec';

class TripPage extends Component {
	state = { loaded: false };

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.targetTrip || {}).length) {
			this.setState({ loaded: true });
		} else {
			this.props.setTargetTrip(this.props.match.params.id);
		}
	}

	render() {
		return (
			<div>
				{this.state.loaded ? (
					<div>
						<TripMap
							activities={this.props.targetTrip.activities}
							googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GM_JS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
							loadingElement={<div id="loading-element" />}
							containerElement={<div id="map-container" />}
							mapElement={<div id="map-element" />}
						/>
						<br />
						<TripDashboard
							targetTrip={this.props.targetTrip}
							history={this.props.history}
						/>
					</div>
				) : (
					'Loading map...'
				)}
				<br />
				<Link to="/mytrips">Back to Trips</Link>
				<br />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	targetTrip: state.trip.targetTrip
});

export default withRouter(
	connect(mapStateToProps, { setTargetTrip })(withAuth(TripPage))
);

// CHANGE TO DESTINATIONS
// <br />
// {this.props.targetActivity.key ? (
// 	<ActivitySpec
// 		activity={this.props.targetActivity}
// 		tripId={this.state.tripId}
// 	/>
// ) : null}
// <br />

//
// <ActivitiesContainer />

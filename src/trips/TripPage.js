import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setTargetTrip } from '../actions/tripActions';
import withAuth from '../app/withAuth';
import { GM_JS_KEY } from '../config.js';
import TripMap from './TripMap';
import TripDashboard from './TripDashboard';
import TripCalendar from './TripCalendar';
import '../stylesheets/tripMap.css';
import { Grid } from 'semantic-ui-react';

class TripPage extends Component {
	state = { loaded: false };

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.targetTrip || {}).length) {
			this.setState({ loaded: true });
		} else {
			this.props.setTargetTrip(this.props.match.params.id);
		}
	}

	targetTripActivities = () => {
		if (this.props.targetTrip.destinations) {
			const activitiesArr = [];
			this.props.targetTrip.destinations.forEach(d => {
				d.activities.forEach(a => {
					activitiesArr.push(a);
				});
			});
			return activitiesArr;
		}
	};

	render() {
		return (
			<div>
				{this.state.loaded ? (
					<Grid columns={2} divided>
						<Grid.Column width={11}>
							<TripCalendar
								trip={this.props.targetTrip}
								activities={this.targetTripActivities()}
							/>
							<br />
							<TripMap
								destinations={this.props.targetTrip.destinations}
								activities={this.targetTripActivities()}
								googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GM_JS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
								loadingElement={<div id="loading-element" />}
								containerElement={<div id="map-container" />}
								mapElement={<div id="map-element" />}
							/>
							<br />
							<Link to="/mytrips">Back to Trips</Link>
						</Grid.Column>
						<Grid.Column width={5}>
							<TripDashboard
								targetTrip={this.props.targetTrip}
								history={this.props.history}
							/>
						</Grid.Column>
					</Grid>
				) : (
					'Loading map...'
				)}
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

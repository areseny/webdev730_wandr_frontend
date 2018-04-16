import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setTargetTrip } from '../actions/tripActions';
import withAuth from '../app/withAuth';
import { GM_JS_KEY } from '../config.js';
import TripMap from './TripMap';
import TripDashboard from './TripDashboard';
import TripCalendar from './TripCalendar';
import '../stylesheets/tripPage.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Grid } from 'semantic-ui-react';

class TripPage extends Component {
	state = { loaded: false };

	componentDidMount() {
		this.props.setTargetTrip(this.props.match.params.id);
	}

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
							<Tabs>
								<TabList>
									<Tab>Calendar</Tab>
									<Tab>Map</Tab>
								</TabList>
								<TabPanel>
									<div className="trip-info-container">
										<TripCalendar trip={this.props.targetTrip} />
									</div>
								</TabPanel>
								<TabPanel>
									<TripMap
										destinations={this.props.targetTrip.destinations}
										activities={this.targetTripActivities()}
										googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GM_JS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
										loadingElement={<div id="loading-element" />}
										containerElement={<div className="trip-info-container" />}
										mapElement={<div id="map-element" />}
									/>
								</TabPanel>
							</Tabs>
							<br />
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
					'Loading trip info...'
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

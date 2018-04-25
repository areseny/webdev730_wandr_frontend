import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import withAuth from '../app/withAuth';
import Navbar from '../app/Navbar';
import { setTargetTrip } from '../actions/tripActions';
// import { GM_JS_KEY } from '../config.js';
import TripMap from './TripMap';
import TripDashboard from './TripDashboard';
import TripCalendar from './TripCalendar';
import { Message, Icon, Tab } from 'semantic-ui-react';
import '../stylesheets/trip.css';

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
		const panes = [
			{
				menuItem: 'Map',
				render: () => (
					<Tab.Pane>
						<TripMap
							destinations={this.props.targetTrip.destinations || []}
							activities={this.targetTripActivities() || []}
							googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
								process.env.REACT_APP_GM_JS_KEY
							}&v=3.exp&libraries=geometry,drawing,places`}
							loadingElement={<div id="loading-element" />}
							containerElement={<div className="trip-info-container" />}
							mapElement={<div id="map-element" />}
						/>
					</Tab.Pane>
				)
			},
			{
				menuItem: 'Calendar',
				render: () => (
					<Tab.Pane>
						<div className="trip-info-container">
							<TripCalendar trip={this.props.targetTrip} />
						</div>
					</Tab.Pane>
				)
			}
		];
		return (
			<div>
				<Navbar history={this.props.history} />
				{this.state.loaded ? (
					<div className="main">
						<div className="content">
							<Tab panes={panes} id="tab-panes" />
							<br />
							<Link to="/mytrips">Back to Trips</Link>
						</div>
						<div className="sidebar">
							<TripDashboard
								targetTrip={this.props.targetTrip}
								history={this.props.history}
							/>
						</div>
					</div>
				) : (
					<Message icon>
						<Icon name="circle notched" color="teal" loading />
						<Message.Content>
							<Message.Header>Just one second</Message.Header>
							We are loading your trip info for you.
						</Message.Content>
					</Message>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	targetTrip: state.trip.targetTrip,
	userTrips: state.trip.userTrips
});

export default withRouter(
	connect(mapStateToProps, { setTargetTrip })(withAuth(TripPage))
);

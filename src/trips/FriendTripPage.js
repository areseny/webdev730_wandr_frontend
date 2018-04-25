import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import withAuth from '../app/withAuth';
import Navbar from '../app/Navbar';
import DestinationsContainer from '../destinations/DestinationsContainer';
import { setFriendTargetTrip } from '../actions/tripActions';
import moment from 'moment';
// import { GM_JS_KEY } from '../config.js';
import TripMap from './TripMap';
import TripDashboard from './TripDashboard';
import { Message, Icon, Rating } from 'semantic-ui-react';
import '../stylesheets/trip.css';

class TripPage extends Component {
	state = { loaded: false };

	componentDidMount() {
		this.props.setFriendTargetTrip(this.props.match.params.id);
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.targetTrip || {}).length) {
			this.setState({ loaded: true });
		} else {
			this.props.setFriendTargetTrip(this.props.match.params.id);
		}
	}

	render() {
		return (
			<div>
				<Navbar history={this.props.history} />
				{this.state.loaded ? (
					<div className="main">
						<div className="content">
							<TripMap
								destinations={this.props.targetTrip.destinations || []}
								activities={this.props.targetTrip.activities || []}
								googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
									process.env.REACT_APP_GM_JS_KEY
								}&v=3.exp&libraries=geometry,drawing,places`}
								loadingElement={<div id="loading-element" />}
								containerElement={<div className="trip-info-container" />}
								mapElement={<div id="map-element" />}
							/>
							<br />
							<Link to="/mytrips">Back to Trips</Link>
						</div>
						<div className="sidebar">
							<h1>{this.props.targetTrip.name}</h1>
							<strong>Description:</strong> {this.props.targetTrip.description}
							<br />
							<strong>Travel Dates:</strong>{' '}
							{moment(this.props.targetTrip.startDate).format('LL')} -
							{moment(this.props.targetTrip.endDate).format('LL')} ({
								this.props.targetTrip.duration
							}{' '}
							days)
							<br />
							<strong>Ratings:</strong>{' '}
							<Rating
								disabled
								icon="star"
								defaultRating={this.props.targetTrip.ratings}
								maxRating={5}
							/>
							<h3>Destinations</h3>
							<DestinationsContainer
								destinations={this.props.targetTrip.destinations}
							/>
						</div>
					</div>
				) : (
					<Message icon>
						<Icon name="circle notched" color="teal" loading />
						<Message.Content>
							<Message.Header>Just one second</Message.Header>
							We are loading this trip info for you.
						</Message.Content>
					</Message>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	targetTrip: state.trip.targetTrip,
	friendsTrips: state.trip.friendsTrips
});

export default withRouter(
	connect(mapStateToProps, { setFriendTargetTrip })(withAuth(TripPage))
);

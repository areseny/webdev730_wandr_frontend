import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import withAuth from '../app/withAuth';
import Navbar from '../app/Navbar';
import moment from 'moment';
import { Card, Grid } from 'semantic-ui-react';
import '../stylesheets/trip.css';

class TripsList extends Component {
	// constructDestinations = destinations => {
	// 	const front = destinations
	// 		.slice(0, -1)
	// 		.map(d => d.name)
	// 		.join(', ');
	// 	const back = `, and ${destinations[destinations.length - 1].name}`;
	// 	return front + back;
	// };

	upcomingTrips = () =>
		this.props.userTrips.length
			? this.props.userTrips.map(
					(ut, i) =>
						new Date(ut.startDate) > new Date() ? (
							<Card
								id="trip-list-card"
								fluid
								key={i}
								color="teal"
								as={Link}
								to={`/mytrips/${ut.id}`}
								header={ut.name}
								meta={`From ${moment(ut.startDate).format('LL')} to ${moment(
									ut.endDate
								).format('LL')}`}
								description={ut.description}
							/>
						) : null
			  )
			: null;

	pastTrips = () =>
		this.props.userTrips.length
			? this.props.userTrips.map(
					(ut, i) =>
						new Date(ut.startDate) < new Date() ? (
							<Card
								fluid
								key={i}
								color="teal"
								as={Link}
								to={`/mytrips/${ut.id}`}
								header={ut.name}
								meta={`From ${moment(ut.startDate).format('LL')} to ${moment(
									ut.endDate
								).format('LL')}`}
								description={ut.description}
							/>
						) : null
			  )
			: null;

	render() {
		return (
			<div>
				<Navbar history={this.props.history} />
				<div className="main-container">
					<h1>Trips</h1>
					<Grid columns={3}>
						<Grid.Column>
							<h3>Upcoming Trips</h3>
							{this.upcomingTrips()}
						</Grid.Column>
						<Grid.Column>
							<h3>Past Trips</h3>
							{this.pastTrips()}
						</Grid.Column>
						<Grid.Column>
							<h3>{"Friends' Trips"}</h3>
							{this.pastTrips()}
						</Grid.Column>
					</Grid>
					<br />
					<Link to="/addTrip">Add New Trip</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userTrips: state.trip.userTrips
});

export default withRouter(connect(mapStateToProps)(withAuth(TripsList)));

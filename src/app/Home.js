import React from 'react';
import withAuth from './withAuth';
import Navbar from './Navbar';
import { Card, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../stylesheets/static.css';

const Home = props => {
	const upcomingTrips = props.userTrips.length
		? props.userTrips.map(
				(ut, i) =>
					new Date(ut.startDate) > new Date() ? (
						<Card
							key={i}
							color="teal"
							as={Link}
							to={`/mytrips/${ut.id}`}
							header={ut.name}
							description={ut.description}
						/>
					) : null
		  )
		: null;

	const pastTrips = props.userTrips.length
		? props.userTrips.map(
				(ut, i) =>
					new Date(ut.startDate) < new Date() ? (
						<Card
							key={i}
							color="teal"
							as={Link}
							to={`/mytrips/${ut.id}`}
							header={ut.name}
							description={ut.description}
						/>
					) : null
		  )
		: null;

	return (
		<div>
			<Navbar history={props.history} />
			<h1 id="title">Welcome, {props.currentUser.firstname}</h1>
			<div className="main-container">
				<Grid columns={3}>
					<Grid.Column>
						<h3>Upcoming Trips</h3>
						{upcomingTrips}
					</Grid.Column>
					<Grid.Column>
						<h3>Past Trips</h3>
						{pastTrips}
					</Grid.Column>
					<Grid.Column>
						<h3>Friend's Trips</h3>
						{pastTrips}
					</Grid.Column>
				</Grid>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	userTrips: state.trip.userTrips
});

export default connect(mapStateToProps)(withAuth(Home));

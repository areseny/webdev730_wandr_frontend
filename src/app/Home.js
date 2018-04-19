import React from 'react';
import withAuth from './withAuth';
import Navbar from './Navbar';
import TripCard from '../trips/TripCard';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import '../stylesheets/static.css';

const Home = props => {
	return (
		<div>
			<Navbar history={props.history} />
			<h1>Welcome, {props.currentUser.firstname}</h1>
			<h3>Upcoming Trips</h3>
			{props.currentUser.user_trips
				? props.currentUser.user_trips.map((ut, i) => {
						console.log(ut);
						return (
							<Card
								key={i}
								color="teal"
								as={Link}
								to={`/mytrips/${ut.id}`}
								header={ut.name}
								description={ut.description}
							/>
						);
				  })
				: null}
			<h3>Past Trips</h3>
		</div>
	);
};

export default withAuth(Home);

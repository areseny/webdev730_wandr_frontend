import React from 'react';
import withAuth from './withAuth';
import Navbar from './Navbar';
import TripsContainer from '../trips/TripsContainer';

const Home = props => (
	<div>
		<Navbar history={props.history} />
		<h1>Welcome, {props.currentUser.firstname}</h1>
		<div>
			<h3>My Trips</h3>
			<TripsContainer />
		</div>
	</div>
);

export default withAuth(Home);

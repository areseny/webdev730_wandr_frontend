import React from 'react';
import withAuth from './withAuth';
import Navbar from './Navbar';

const Home = props => (
	<div>
		<Navbar history={props.history} />
		<h1>Welcome, {props.currentUser.firstname}</h1>
		<h3>Upcoming Trips</h3>
		<h3>Past Trips</h3>
	</div>
);

export default withAuth(Home);

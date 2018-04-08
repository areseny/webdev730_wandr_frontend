import React from 'react';
import withAuth from '../withAuth';
import Navbar from './Navbar';

const Home = props => (
	<div>
		<Navbar history={props.history} />
		<h1>Welcome, {props.currentUser.firstname}</h1>
	</div>
);

export default withAuth(Home);

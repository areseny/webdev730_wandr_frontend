import React from 'react';
import { NavLink } from 'react-router-dom';
import { logOut } from '../actions/authActions';
import { connect } from 'react-redux';

const Navbar = props => (
	<div>
		<NavLink to="/home">Home</NavLink>
		<NavLink to="/mytrips">Trips</NavLink>
		<NavLink to="/about">About</NavLink>
		<NavLink to="/contact">Contact</NavLink>
		<button onClick={() => props.logOut(props.history)}>Log Out</button>
	</div>
);

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn,
	currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, { logOut })(Navbar);

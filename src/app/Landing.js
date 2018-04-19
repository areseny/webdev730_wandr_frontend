import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';

export default class Landing extends Component {
	render() {
		return (
			<div>
				<h1>Welcome to Wandr</h1>
				<Signup />
				<br />
				<Link to="/login">Already a member?</Link>
			</div>
		);
	}
}

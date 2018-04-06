import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Landing extends Component {
	render() {
		return (
			<div>
				<h1>welcome to landing page</h1>
				<Link to="/login">Log In</Link> or <Link to="/signup">Sign Up</Link> to
				begin
			</div>
		);
	}
}

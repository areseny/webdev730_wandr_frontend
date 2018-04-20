import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import '../stylesheets/static.css';

export default class Landing extends Component {
	render() {
		return (
			<div id="landing-container">
				<h1 id="title">Welcome to</h1>
				<h1 id="logo">WANDR</h1>

				<div className="static-form">
					<Signup history={this.props.history} />
					<Link to="/login">Already a member?</Link>
				</div>
			</div>
		);
	}
}

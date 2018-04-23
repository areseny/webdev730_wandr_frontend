import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import '../stylesheets/static.css';
import bgVid from '../media/bgVid.mp4';

export default class Landing extends Component {
	render() {
		return (
			<div id="landing-container">
				<video className="bgVid" autoPlay loop muted>
					<source src={bgVid} type="video/mp4" />
				</video>

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

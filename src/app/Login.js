import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logIn } from '../actions/authActions';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import '../stylesheets/static.css';
import bgVid from '../media/bgVid.mp4';

class Login extends Component {
	state = { username: '', password: '' };

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.logIn(
			this.state.username,
			this.state.password,
			this.props.history
		);
	};

	render() {
		return (
			<div id="landing-container">
				<video className="bgVid" autoPlay loop muted>
					<source src={bgVid} type="video/mp4" />
				</video>
				<h1 id="title">Welcome to</h1>
				<h1 id="logo">WANDR</h1>
				<div className="static-form">
					<Form onSubmit={this.handleSubmit}>
						<Form.Group unstackable widths={2}>
							<Form.Input
								label="Username"
								placeholder="Username"
								name="username"
								value={this.state.username}
								onChange={this.handleChange}
							/>
							<Form.Input
								label="Password"
								placeholder="Password"
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Button primary type="submit">
							Login
						</Button>
					</Form>
					<Link to="/">Create an account</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps, { logIn })(Login);

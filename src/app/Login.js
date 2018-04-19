import React, { Component } from 'react';
import { logIn } from '../actions/authActions';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

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
			<Form onSubmit={this.handleSubmit}>
				<h1>Log In</h1>
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
				<Button primary type="submit">
					Login
				</Button>
			</Form>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps, { logIn })(Login);

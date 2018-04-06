import React from 'react';
import { logIn } from '../actions/userActions';
import { connect } from 'react-redux';

class Login extends React.Component {
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
			<div>
				<h1>Log In</h1>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default connect(null, { logIn })(Login);

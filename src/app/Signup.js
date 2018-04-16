import React, { Component } from 'react';
import { signUp } from '../actions/authActions';
import { connect } from 'react-redux';

class Signup extends Component {
	state = {
		firstname: '',
		lastname: '',
		hometown: '',
		username: '',
		password: '',
		confirmation: ''
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.password === this.state.confirmation) {
			this.props.signUp(this.state, this.props.history);
		} else {
			alert('Passwords do not match!');
		}
	};

	render() {
		return (
			<div>
				<h1>Sign Up</h1>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="firstname"
						placeholder="First Name"
						value={this.state.firstname}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="lastname"
						placeholder="Last Name"
						value={this.state.lastname}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="confirmation"
						placeholder="Confirm Password"
						value={this.state.confirmation}
						onChange={this.handleChange}
					/>
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default connect(null, { signUp })(Signup);

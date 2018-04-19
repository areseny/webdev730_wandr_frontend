import React, { Component } from 'react';
import { signUp } from '../actions/authActions';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

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
			<Form onSubmit={this.handleSubmit}>
				<Form.Group>
					<Form.Input
						label="First Name"
						placeholder="First Name"
						name="firstname"
						value={this.state.firstname}
						onChange={this.handleChange}
						width={8}
					/>
					<Form.Input
						label="Last Name"
						placeholder="Last Name"
						name="lastname"
						value={this.state.lastname}
						onChange={this.handleChange}
						width={8}
					/>
				</Form.Group>

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
				<Form.Input
					label="Confirm Password"
					placeholder="Confirm Password"
					type="password"
					name="confirmation"
					value={this.state.confirmation}
					onChange={this.handleChange}
				/>
				<Button primary type="submit">
					Sign Up
				</Button>
			</Form>
		);
	}
}

export default connect(null, { signUp })(Signup);

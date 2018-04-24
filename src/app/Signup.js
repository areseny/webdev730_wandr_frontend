import React, { Component } from 'react';
import { signUp } from '../actions/authActions';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import '../stylesheets/static.css';

class Signup extends Component {
	state = {
		firstname: '',
		lastname: '',
		hometown: '',
		dob: '',
		email: '',
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
				<Form.Group unstackable widths={2}>
					<Form.Input
						required
						label="First Name"
						placeholder="First Name"
						name="firstname"
						value={this.state.firstname}
						onChange={this.handleChange}
					/>
					<Form.Input
						label="Last Name"
						placeholder="Last Name"
						name="lastname"
						value={this.state.lastname}
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Form.Group unstackable widths={2}>
					<Form.Input
						label="Hometown"
						placeholder="Hometown"
						name="hometown"
						value={this.state.hometown}
						onChange={this.handleChange}
					/>
					<Form.Input
						type="date"
						label="Date of Birth"
						name="dob"
						value={this.state.dob}
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						width={12}
						required
						label="Email"
						placeholder="email@example.com"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Form.Group unstackable widths={3}>
					<Form.Input
						required
						label="Username"
						placeholder="Username"
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
					<Form.Input
						required
						label="Password"
						placeholder="Password"
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
					<Form.Input
						required
						label="Confirm Password"
						placeholder="Confirm Password"
						type="password"
						name="confirmation"
						value={this.state.confirmation}
						onChange={this.handleChange}
					/>
				</Form.Group>
				<Button primary type="submit">
					Sign Up
				</Button>
			</Form>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn,
	currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, { signUp })(Signup);

import React, { Component } from 'react';

export default class AddTripForm extends Component {
	state = { name: '', description: '', duration: '' };
	render() {
		return (
			<form>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={this.state.name}
				/>
				<input
					type="text"
					name="description"
					placeholder="Description"
					value={this.state.description}
				/>
				<input
					type="text"
					name="duration"
					placeholder="Number of Days"
					value={this.state.duration}
				/>
				<input type="submit" value="Add Trip" />
			</form>
		);
	}
}

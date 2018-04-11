import React, { Component } from 'react';
import TripContent from './TripContent';
import EditTripForm from './EditTripForm';

export default class TripDashboard extends Component {
	state = { editing: false };

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	displayEditSection = () =>
		this.state.editing ? (
			<div>
				<EditTripForm trip={this.props.trip} toggleEdit={this.toggleEdit} />
			</div>
		) : (
			<button onClick={this.toggleEdit}>Edit Trip</button>
		);

	render() {
		return (
			<div>
				<h1>{this.props.trip.name}</h1>
				<TripContent trip={this.props.trip} />
				<br />
				{this.displayEditSection()}
				<button onClick={this.handleDelete}>Delete Trip</button>
			</div>
		);
	}
}

import React, { Component } from 'react';
import AddTripForm from './AddTripForm';
import TripCard from './TripCard';

export default class TripsList extends Component {
	displayTripCards = () =>
		this.props.trips.map((t, i) => (
			<li key={i}>
				<TripCard trip={t} />
			</li>
		));

	render() {
		return (
			<div>
				<ul>{this.displayTripCards()}</ul>
				<AddTripForm />
			</div>
		);
	}
}

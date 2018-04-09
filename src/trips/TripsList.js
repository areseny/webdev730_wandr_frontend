import React, { Component } from 'react';

export default class TripsList extends Component {
	render() {
		return (
			<div>
				{this.props.trip.name}
				<button>Edit Trip</button>
				<button>Delete Trip</button>
				<br />
				{this.props.trip.description}
				<br />
				{this.props.trip.duration} Days
			</div>
		);
	}
}

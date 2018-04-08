import React, { Component } from 'react';

export default class TripsList extends Component {
	render() {
		console.log(this.props);
		return (
			<div>
				{this.props.trip.name}
				<br />
				{this.props.trip.description}
			</div>
		);
	}
}

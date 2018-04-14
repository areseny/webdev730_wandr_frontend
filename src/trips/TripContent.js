import React, { Component } from 'react';
import moment from 'moment';
import DestinationsContainer from '../destinations/DestinationsContainer';

export default class TripContent extends Component {
	render() {
		return (
			<div>
				Description: {this.props.targetTrip.description}
				<br />
				Timeline: from {moment(this.props.targetTrip.startDate).format('LL')} to
				{moment(this.props.targetTrip.endDate).format('LL')} ({
					this.props.targetTrip.duration
				}{' '}
				days)
				<br />
				Ratings: {this.props.targetTrip.ratings}
				<br />
				<br />
				<DestinationsContainer
					destinations={this.props.targetTrip.destinations}
				/>
			</div>
		);
	}
}

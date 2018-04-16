import React, { Component } from 'react';
import moment from 'moment';

export default class TripContent extends Component {
	render() {
		return (
			<div>
				Description: {this.props.targetTrip.description}
				<br />
				Travel Dates: {moment(this.props.targetTrip.startDate).format('LL')} -
				{moment(this.props.targetTrip.endDate).format('LL')} ({
					this.props.targetTrip.duration
				}{' '}
				days)
				<br />
				Ratings: {this.props.targetTrip.ratings}
			</div>
		);
	}
}

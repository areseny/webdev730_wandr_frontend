import React, { Component } from 'react';
import moment from 'moment';

export default class TripContent extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.toggleEdit}>Edit Trip</button>
				<br />
				Description: {this.props.targetTrip.description}
				<br />
				Timeline: from {moment(this.props.targetTrip.startDate).format('LL')} to
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

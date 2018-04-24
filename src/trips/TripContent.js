import React, { Component } from 'react';
import moment from 'moment';
import { Rating, Icon } from 'semantic-ui-react';

export default class TripContent extends Component {
	render() {
		return (
			<div>
				<strong>Description:</strong> {this.props.targetTrip.description}
				<br />
				<strong>Travel Dates:</strong>{' '}
				{moment(this.props.targetTrip.startDate).format('LL')} -
				{moment(this.props.targetTrip.endDate).format('LL')} ({
					this.props.targetTrip.duration
				}{' '}
				days)
				<br />
				<strong>Ratings:</strong>{' '}
				<Rating
					icon="star"
					defaultRating={this.props.targetTrip.ratings}
					maxRating={5}
				/>
				<a
					className="float-right-btn"
					role="button"
					onClick={this.props.toggleEdit}
					style={{ cursor: 'pointer' }}>
					<Icon name="edit" />
				</a>
			</div>
		);
	}
}

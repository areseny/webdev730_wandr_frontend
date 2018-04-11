import React from 'react';
import moment from 'moment';

const TripContent = props => (
	<div>
		Description: {props.trip.description}
		<br />
		Duration: {props.trip.duration} days
		<br />
		Timeline: from {moment(props.trip.startDate).format('LL')} to{' '}
		{moment(props.trip.endDate).format('LL')}
		<br />
		Ratings: {props.trip.ratings}
	</div>
);

export default TripContent;

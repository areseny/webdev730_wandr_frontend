import React from 'react';

const TripContent = props => (
	<div>
		Description: {props.trip.description}
		<br />
		Duration: {props.trip.duration} days
		<br />
		Timeline: from {props.trip.startDate} to {props.trip.endDate}
		<br />
		Ratings: {props.trip.ratings}
	</div>
);

export default TripContent;

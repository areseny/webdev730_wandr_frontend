import React from 'react';
import { Link } from 'react-router-dom';

const TripCard = props => (
	<div>
		<strong>{props.trip.name}</strong>
		<br />
		{props.trip.description}
		<br />
		{props.trip.duration} days
		<br />
		From {props.trip.startDate} to {props.trip.endDate}
		<br />
		<Link to={`/trips/${props.trip.tripId}`}>See Trip Details</Link>
	</div>
);
export default TripCard;

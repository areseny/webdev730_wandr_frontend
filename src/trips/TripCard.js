import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TripCard = props => {
	const startDate = () => moment(props.trip.startDate).format('LL');
	const endDate = () => moment(props.trip.endDate).format('LL');

	return (
		<div>
			<strong>{props.trip.name}</strong>
			<br />
			{props.trip.description}
			<br />
			{props.trip.duration} days
			<br />
			From {startDate()} to {endDate()}
			<br />
			<Link to={`/trips/${props.trip.id}`}>See Trip Details</Link>
		</div>
	);
};
export default TripCard;

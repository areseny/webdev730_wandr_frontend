import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TripCard = props => {
	const startDate = () => moment(props.trip.startDate).format('LL');
	const endDate = () => moment(props.trip.endDate).format('LL');

	const destinations = () => {
		const front = props.trip.destinations
			.slice(0, -1)
			.map(d => d.name)
			.join(', ');
		const back = `, and ${
			props.trip.destinations[props.trip.destinations.length - 1].name
		}`;
		return front + back;
	};

	return (
		<div>
			<strong>{props.trip.name}</strong>
			<br />
			{props.trip.description}
			<br />
			From {startDate()} to {endDate()} ({props.trip.duration} days)
			<br />
			Visits {destinations()}
			<br />
			<Link to={`/mytrips/${props.trip.id}`}>See Trip Details</Link>
		</div>
	);
};
export default TripCard;

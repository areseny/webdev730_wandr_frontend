import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Card } from 'semantic-ui-react';

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
		<Card
			fluid
			color="teal"
			href={`/mytrips/${props.trip.id}`}
			header={props.trip.name}
			meta={`Visits ${destinations()}`}
			description={props.trip.description}
			extra={`From ${startDate()} to ${endDate()} (${
				props.trip.duration
			} days)`}
		/>
	);
};
export default TripCard;

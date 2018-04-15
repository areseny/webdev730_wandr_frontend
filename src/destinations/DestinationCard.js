import React from 'react';
import ActivitiesContainer from '../activities/ActivitiesContainer';

const DestinationCard = props => (
	<div>
		{props.destination.name}
		<br />
		Arrive: {props.destination.arrival}
		<br />
		Depart: {props.destination.depart}
		<br />
		{props.destination.description}
		<br />
		{props.destination.activities.length ? (
			<ActivitiesContainer
				activities={props.destination.activities}
				destinationId={props.destination.id}
			/>
		) : (
			' No activity have been planned (yet...)'
		)}
		<br />
	</div>
);

export default DestinationCard;

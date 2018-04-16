import React from 'react';
import ActivitiesContainer from '../activities/ActivitiesContainer';

const DestinationCard = props => (
	<div>
		{props.destination.name}
		<br />
		{props.destination.description}
		<br />
		<ActivitiesContainer
			activities={props.destination.activities}
			destinationId={props.destination.id}
		/>
		<br />
	</div>
);

export default DestinationCard;

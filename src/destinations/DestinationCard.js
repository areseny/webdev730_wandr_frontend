import React from 'react';
import ActivitiesContainer from '../activities/ActivitiesContainer';
import '../stylesheets/destinations.css';
import { Card } from 'semantic-ui-react';

const DestinationCard = props => (
	<Card
		fluid
		color="pink"
		header={props.destination.name}
		meta={props.destination.description}>
		<ActivitiesContainer
			activities={props.destination.activities}
			destinationId={props.destination.id}
		/>
	</Card>
);

export default DestinationCard;

// "map marker icon"

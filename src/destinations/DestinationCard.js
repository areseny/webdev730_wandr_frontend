import React from 'react';
import ActivitiesContainer from '../activities/ActivitiesContainer';
import { connect } from 'react-redux';
import { clearTargetDestination } from '../actions/destActions';
import { Card } from 'semantic-ui-react';
import '../stylesheets/destinations.css';

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
		<a
			className="float-right-btn"
			role="button"
			onClick={props.clearTargetDestination}
			style={{ cursor: 'pointer' }}>
			Back
		</a>
	</Card>
);

export default connect(null, { clearTargetDestination })(DestinationCard);

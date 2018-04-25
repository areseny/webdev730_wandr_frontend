import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Card } from 'semantic-ui-react';
import { setTargetDestination } from '../actions/destActions';
import '../stylesheets/destinations.css';

const DestinationCardLite = props => (
	<Card
		onClick={() => {
			props.setTargetDestination(props.destination.id);
		}}
		fluid
		color="pink"
		header={props.destination.name}
		meta={`${moment(props.destination.arrival).format('MMM DD')} - ${moment(
			props.destination.departure
		).format('MMM Do')}`}
		description={props.destination.description}
	/>
);

export default connect(null, { setTargetDestination })(DestinationCardLite);

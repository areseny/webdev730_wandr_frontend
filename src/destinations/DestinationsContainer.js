import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DestinationCard from './DestinationCard';
import { Card, Container } from 'semantic-ui-react';
import { setTargetDestination } from '../actions/destActions';
import '../stylesheets/destinations.css';

const DestinationsContainer = props => (
	<Container id="side-pane">
		<h3>Destinations</h3>
		{props.destinations
			? props.destinations.map((d, i) => (
					<Card.Group id="dest-cards" key={i}>
						{d.id === props.targetDestination.id ? (
							<DestinationCard destination={d} />
						) : (
							<Card
								onClick={() => {
									props.setTargetDestination(d.id);
								}}
								fluid
								color="pink"
								header={d.name}
								meta={`${moment(d.arrival).format('MMM DD')} - ${moment(
									d.departure
								).format('MMM Do')}`}
								description={d.description}
							/>
						)}
					</Card.Group>
			  ))
			: 'No destination has been added (yet...)'}
	</Container>
);

const mapStateToProps = state => ({
	targetDestination: state.trip.targetDestination
});

export default connect(mapStateToProps, { setTargetDestination })(
	DestinationsContainer
);

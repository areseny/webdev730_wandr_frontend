import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DestinationCard from './DestinationCard';

const DestinationsContainer = props => (
	<div>
		<h3>Destinations</h3>
		<ol>
			{props.destinations
				? props.destinations.map((d, i) => (
						<li key={i}>
							{d.id === props.targetDestination.id ? (
								<DestinationCard destination={d} />
							) : (
								<div>
									{d.name} ({`${moment(d.arrival).format('MMM DD')} - ${moment(
										d.departure
									).format('MMM Do')}`})
								</div>
							)}
						</li>
				  ))
				: 'No destination has been added (yet...)'}
		</ol>
	</div>
);

const mapStateToProps = state => ({
	targetDestination: state.trip.targetDestination
});

export default connect(mapStateToProps)(DestinationsContainer);

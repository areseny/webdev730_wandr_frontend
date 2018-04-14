import React from 'react';
import { connect } from 'react-redux';
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
								d.name
							)}
						</li>
				  ))
				: 'No destination has been added (yet...)'}
		</ol>
	</div>
);

const mapStateToProps = state => ({
	targetDestination: state.dest.targetDestination
});

export default connect(mapStateToProps)(DestinationsContainer);

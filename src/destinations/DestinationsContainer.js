import React from 'react';
import DestinationCard from './DestinationCard';

const DestinationsContainer = props => (
	<div>
		<h3>Destinations</h3>
		<ol>
			{props.destinations
				? props.destinations.map((d, i) => (
						<li key={i}>
							<DestinationCard destination={d} />
						</li>
				  ))
				: 'No destination has been added (yet...)'}
		</ol>
	</div>
);

export default DestinationsContainer;

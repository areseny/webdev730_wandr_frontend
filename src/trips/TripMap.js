import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
// import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import ActivityMarker from '../activities/ActivityMarker';

const TripMap = withScriptjs(
	withGoogleMap(props => {
		console.log(props.activities);
		const displayActivityMarkers = props.activities.map((a, i) => (
			<ActivityMarker activity={a} key={i} />
		));

		return (
			<GoogleMap defaultZoom={2} defaultCenter={{ lat: 0, lng: 0 }}>
				{displayActivityMarkers}
			</GoogleMap>
		);
	})
);

export default TripMap;

// <MarkerClusterer enableRetinaIcons={true} maxZoom={5} gridSize={100}>
// 	{props.stories.length > 0
// 		? props.stories.map(s => (
// 				<ActivityMarker user={props.user} story={s} key={s.id} />
// 		  ))
// 		: null}
// </MarkerClusterer>

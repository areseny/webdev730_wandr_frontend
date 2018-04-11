import React from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Polyline
} from 'react-google-maps';
// import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import ActivityMarker from '../activities/ActivityMarker';

const TripMap = withScriptjs(
	withGoogleMap(props => {
		const activityMarkers = props.activities.map((a, i) => (
			<ActivityMarker activity={a} key={i} />
		));

		const polylinePath = props.activities.map(a => ({
			lat: Number(a.lat),
			lng: Number(a.lng)
		}));

		return (
			<GoogleMap defaultZoom={3} defaultCenter={{ lat: 0, lng: 0 }}>
				{activityMarkers}
				<Polyline path={polylinePath} />
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

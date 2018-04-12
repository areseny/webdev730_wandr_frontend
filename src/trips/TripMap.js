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

		const center = () => {
			const latSum = props.activities.map(a => Number(a.lat))[0];
			const lngSum = props.activities.map(a => Number(a.lng))[0];
			const avgLat = latSum / props.activities.length;
			const avgLng = lngSum / props.activities.length;
			return { lat: avgLat, lng: avgLng };
		};

		// const bounds = new window.google.maps.LatLngBounds();
		// 	props.activities.forEach(a => {
		// 		bounds.extend(
		// 			new window.google.maps.LatLng(Number(a.lat), Number(a.lng))
		// 		);
		// 	});

		return (
			<GoogleMap defaultZoom={2} defaultCenter={center()}>
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

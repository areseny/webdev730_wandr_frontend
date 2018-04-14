import React from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Polyline
} from 'react-google-maps';
import DestinationMarker from '../destinations/DestinationMarker';
import ActivityMarker from '../activities/ActivityMarker';

const TripMap = withScriptjs(
	withGoogleMap(props => {
		const polylinePath = props.destinations.map(d => ({
			lat: Number(d.lat),
			lng: Number(d.lng)
		}));

		const center = () => {
			const latSum = props.destinations.map(d => Number(d.lat))[0];
			const lngSum = props.destinations.map(d => Number(d.lng))[0];
			const avgLat = latSum / props.destinations.length;
			const avgLng = lngSum / props.destinations.length;
			return { lat: avgLat, lng: avgLng };
		};

		return (
			<GoogleMap defaultZoom={2} defaultCenter={center()}>
				{props.destinations.map((d, i) => (
					<DestinationMarker destination={d} key={i} />
				))}
				{props.activities.map((a, i) => (
					<ActivityMarker activity={a} key={i} />
				))}
				<Polyline path={polylinePath} />
			</GoogleMap>
		);
	})
);

export default TripMap;

// {props.activities.map((a, i) => (
// 	<ActivityMarker activity={a} key={i} />
// ))}

export const fetchUserTrips = () => dispatch => {
	const options = { headers: { Authorization: localStorage.getItem('jwt') } };
	fetch(`https://wandr-backend.herokuapp.com/user_trips`, options)
		.then(res => res.json())
		.then(json => {
			const userTrips = json.map(ut => parseTripJson(ut));
			dispatch({ type: 'FETCH_USER_TRIPS', userTrips });
		});
};

export const setTargetTrip = id => ({ type: 'SET_TARGET_TRIP', id });

export const setFriendTargetTrip = id => ({
	type: 'SET_FRIEND_TARGET_TRIP',
	id
});

export const addTrip = (
	{ name, description, duration, startDate, endDate, ratings, destinations },
	history
) => dispatch => {
	const start_date = new Date(startDate);
	const end_date = endDate;
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({
			trip: { name, description, duration },
			user_trip: { start_date, end_date, ratings },
			destinations
		})
	};

	fetch('https://wandr-backend.herokuapp.com/user_trips', options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'ADD_TRIP',
				newTrip: parseTripJson(json)
			});
		})
		.then(() => {
			history.push('/mytrips');
		});
};

export const editTrip = ({
	id,
	name,
	description,
	duration,
	startDate,
	endDate,
	ratings,
	destinations
}) => dispatch => {
	let start_date = startDate;
	let end_date = endDate;
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({
			trip: { name, description, duration },
			user_trip: { start_date, end_date, ratings },
			destinations
		})
	};
	fetch(`https://wandr-backend.herokuapp.com/user_trips/${id}`, options)
		.then(res => res.json())
		.then(json => {
			console.log(json);
			dispatch({
				type: 'EDIT_TRIP',
				editedTrip: parseTripJson(json)
			});
		});
};

export const deleteTrip = (id, history) => dispatch => {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	};
	fetch(`https://wandr-backend.herokuapp.com/user_trips/${id}`, options)
		.then(res => res.json())
		.then(msg => {
			history.push('/mytrips');
			dispatch({ type: 'DELETE_TRIP', id });
		});
};

const parseTripJson = json => ({
	id: json.id,
	tripId: json.trip_id,
	name: json.trip.name,
	description: json.trip.description,
	duration: json.trip.duration,
	startDate: json.start_date,
	endDate: json.end_date,
	ratings: json.ratings,
	destinations: parseDestinationsJson(json.destinations, json.trip.id)
});

const parseDestinationsJson = (destinations, tripId) =>
	destinations.map(d => {
		return {
			id: d.id,
			name: d.name,
			description: d.description,
			lat: d.lat,
			lng: d.lng,
			arrival: d.trip_destinations.filter(td => td.trip_id === tripId)[0]
				.arrival,
			departure: d.trip_destinations.filter(td => td.trip_id === tripId)[0]
				.departure,
			activities: parseActivitiesJson(d.activities)
		};
	});

const parseActivitiesJson = activities =>
	activities.map(a => ({
		id: a.id,
		name: a.name,
		address: a.address,
		cost: a.cost,
		description: a.description,
		startTime: a.start_time,
		endTime: a.end_time,
		lat: a.lat,
		lng: a.lng
	}));

// const parseDestinationsTimes = destinations =>
// 	destinations.map(d => ({
// 		...d,
// 		arrival: d.arrival
// 			? d.arrival._d.toISOString()
// 			: new Date(d.arrival).toISOString(),
// 		departure: d.departure
// 			? d.departure._d.toISOString()
// 			: new Date(d.departure).toISOString()
// 	}));

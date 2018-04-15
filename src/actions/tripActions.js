export const fetchUserTrips = () => dispatch => {
	fetch(`http://localhost:3000/user_trips`, {
		headers: { Authorization: localStorage.getItem('jwt') }
	})
		.then(res => res.json())
		.then(json => {
			const userTrips = json.map(ut => parseTripData(ut));
			dispatch({ type: 'FETCH_USER_TRIPS', userTrips });
		});
};

export const setTargetTrip = id => ({ type: 'SET_TARGET_TRIP', id });

export const addTrip = ({
	name,
	description,
	duration,
	startDate,
	endDate,
	ratings,
	destinations
}) => dispatch => {
	const start_date = startDate._d;
	const end_date = endDate._d;
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
			destinations: parseDestinationsTimes(destinations)
		})
	};

	fetch('http://localhost:3000/user_trips', options)
		.then(res => res.json())
		.then(json => {
			debugger;
			dispatch({
				type: 'ADD_TRIP',
				newTrip: parseTripData(json)
			});
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
	fetch(`http://localhost:3000/user_trips/${id}`, options)
		.then(res => res.json())
		.then(json => {
			console.log(parseTripData(json));
			dispatch({
				type: 'EDIT_TRIP',
				editedTrip: parseTripData(json)
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
	fetch(`http://localhost:3000/user_trips/${id}`, options)
		.then(res => res.json())
		.then(msg => {
			history.push('/mytrips');
			dispatch({ type: 'DELETE_TRIP', id });
		});
};

const parseTripData = json => ({
	id: json.id,
	tripId: json.trip.id,
	name: json.trip.name,
	description: json.trip.description,
	duration: json.trip.duration,
	startDate: json.start_date,
	endDate: json.end_date,
	ratings: json.ratings,
	destinations: parseDestinationsData(json.destinations, json.trip.id)
});

const parseDestinationsData = (destinations, tripId) =>
	destinations.map(d => ({
		id: d.id,
		name: d.name,
		description: d.description,
		lat: d.lat,
		lng: d.lng,
		arrival: d.trip_destinations.filter(td => td.trip_id === tripId)[0].arrival,
		departure: d.trip_destinations.filter(td => td.trip_id === tripId)[0]
			.departure,
		activities: parseActivitiesData(d.activities)
	}));

const parseActivitiesData = activities =>
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

const parseDestinationsTimes = destinations =>
	destinations.map(d => ({
		...d,
		arrival: d.arrival._d,
		departure: d.departure._d
	}));

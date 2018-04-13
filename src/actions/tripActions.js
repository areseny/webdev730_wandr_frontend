const parseTripData = json => ({
	id: json.id,
	tripId: json.trip.id,
	name: json.trip.name,
	description: json.trip.description,
	duration: json.trip.duration,
	startDate: json.start_date,
	endDate: json.end_date,
	ratings: json.ratings,
	activities: json.activities,
	destinations: json.destinations
});

export const fetchUserTrips = history => dispatch => {
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
	const start_date = startDate;
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
	fetch('http://localhost:3000/user_trips', options)
		.then(res => res.json())
		.then(json => {
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

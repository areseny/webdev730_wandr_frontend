export const fetchUserTrips = history => dispatch => {
	fetch(`http://localhost:3000/user_trips`, {
		headers: { Authorization: localStorage.getItem('jwt') }
	})
		.then(res => res.json())
		.then(json => {
			const userTrips = json.map(ut => ({
				id: ut.id,
				name: ut.trip.name,
				description: ut.trip.description,
				duration: ut.trip.duration,
				startDate: ut.start_date,
				endDate: ut.end_date,
				ratings: ut.ratings,
				tripId: ut.trip_id
			}));
			dispatch({ type: 'FETCH_USER_TRIPS', userTrips });
		})
		.then(() => {
			history.push('/trips');
		});
};

const parseData = json => {
	return {
		id: json.user_trip.id,
		name: json.trip.name,
		description: json.trip.description,
		duration: json.trip.duration,
		startDate: json.user_trip.start_date,
		endDate: json.user_trip.end_date,
		ratings: json.user_trip.ratings
	};
};

export const addTrip = ({
	name,
	description,
	duration,
	startDate,
	endDate,
	ratings
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
			user_trip: { start_date, end_date, ratings }
		})
	};
	fetch('http://localhost:3000/trips', options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'ADD_TRIP',
				newTrip: parseData(json)
			});
		});
};

export const fetchTrip = id => dispatch => {
	fetch(`http://localhost:3000/user_trips/${id}`)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'FETCH_TRIP',
				trip: { ...parseData(json), activities: json.trip.activities }
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
	ratings
}) => dispatch => {
	const start_date = startDate;
	const end_date = endDate;
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({
			trip: { name, description, duration },
			user_trip: { start_date, end_date, ratings }
		})
	};
	fetch(`http://localhost:3000/user_trips/${id}`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'EDIT_TRIP',
				editedTrip: parseData(json)
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
			dispatch({ type: 'DELETE_TRIP', userTripId: id });
		})
		.then(() => {
			history.push('/trips');
		});
};

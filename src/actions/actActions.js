const parseData = json => ({
	id: json.id,
	name: json.name,
	description: json.description,
	cost: json.cost,
	startTime: json.start_time,
	endTime: json.end_time,
	address: json.address,
	lat: json.lat,
	lng: json.lng,
	tripId: json.trip_id
});

export const fetchActivities = tripId => dispatch => {
	fetch(`http://localhost:3000/trips/${tripId}/activities`)
		.then(res => res.json())
		.then(json => {
			const activities = json.map(a => parseData(a));
			dispatch({ type: 'FETCH_ACTIVITIES', activities });
		});
};

export const addActivity = ({
	name,
	description,
	cost,
	startTime,
	endTime,
	address,
	lat,
	lng,
	tripId
}) => dispatch => {
	const start_time = startTime;
	const end_time = endTime;
	const id = tripId;
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			activity: {
				name,
				description,
				cost,
				start_time,
				end_time,
				address,
				lat,
				lng
			},
			trip: { id },
			destination: { lat, lng }
		})
	};
	fetch(`http://localhost:3000/trips/${tripId}/activities`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'ADD_ACTIVITY',
				newActivity: parseData(json)
			});
		});
};

// need to change
export const editActivity = ({
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
//
// export const deleteTrip = (id, history) => dispatch => {
// 	const options = {
// 		method: 'DELETE',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Accept: 'application/json'
// 		}
// 	};
// 	fetch(`http://localhost:3000/user_trips/${id}`, options)
// 		.then(res => res.json())
// 		.then(msg => {
// 			dispatch({ type: 'DELETE_TRIP', userTripId: id });
// 		})
// 		.then(() => {
// 			history.push('/trips');
// 		});
// };

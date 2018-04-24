const parseActivityJson = json => ({
	id: json.id,
	name: json.name,
	description: json.description,
	cost: json.cost,
	startTime: json.start_time,
	endTime: json.end_time,
	address: json.address,
	lat: json.lat,
	lng: json.lng
});

export const addActivity = ({
	id,
	name,
	description,
	cost,
	startTime,
	endTime,
	address,
	lat,
	lng,
	destinationId
}) => dispatch => {
	const start_time = startTime ? startTime.toISOString() : new Date();
	const end_time = endTime ? endTime.toISOString() : new Date();
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
			user_trip: { id },
			destination: { destinationId }
		})
	};
	fetch(`https://wandr-backend.herokuapp.com/activities`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'ADD_ACTIVITY', newActivity: parseActivityJson(json) });
		});
};

export const editActivity = ({
	id,
	name,
	description,
	cost,
	startTime,
	endTime,
	address,
	lat,
	lng
}) => dispatch => {
	const start_time = startTime;
	const end_time = endTime;
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			activity: {
				id,
				name,
				description,
				cost,
				start_time,
				end_time,
				address,
				lat,
				lng
			}
		})
	};
	fetch(`https://wandr-backend.herokuapp.com/activities/${id}`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'EDIT_ACTIVITY',
				editedActivity: parseActivityJson(json)
			});
		});
};

export const deleteActivity = (id, destinationId) => dispatch => {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	};
	fetch(`https://wandr-backend.herokuapp.com/activities/${id}`, options)
		.then(res => res.json())
		.then(msg => {
			dispatch({ type: 'DELETE_ACTIVITY', payload: { id, destinationId } });
		});
};

export const updateTargetActivity = activity => ({
	type: 'UPDATE_TARGET_ACTIVITY',
	activity
});

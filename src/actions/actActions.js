const parseActivityData = json => ({
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
	destinationName
}) => dispatch => {
	const start_time = startTime;
	const end_time = endTime;
	const destination_name = destinationName;
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
			destination: {
				lat,
				lng,
				destination_name
			}
		})
	};
	fetch(`http://localhost:3000/activities`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'ADD_ACTIVITY', newActivity: parseActivityData(json) });
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
	fetch(`http://localhost:3000/activities/${id}`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'EDIT_ACTIVITY',
				editedActivity: parseActivityData(json)
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
	fetch(`http://localhost:3000/activities/${id}`, options)
		.then(res => res.json())
		.then(msg => {
			dispatch({ type: 'DELETE_ACTIVITY', payload: { id, destinationId } });
		});
};

export const addActivity = ({
	name,
	description,
	cost,
	startTime,
	endTime,
	address,
	lat,
	lng,
	trip_id
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
	fetch('http://localhost:3000/user_trips', options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'ADD_TRIP',
				newActivity: parseData(json)
			});
		});
};

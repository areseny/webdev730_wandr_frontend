export const fetchUserTrips = () => dispatch => {
	fetch(`http://localhost:3000/user_trips`, {
		headers: { Authorization: localStorage.getItem('jwt') }
	})
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'FETCH_USER_TRIPS', payload: json });
		});
};

export const addTrip = ({
	name,
	description,
	duration,
	startDate,
	endDate
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
			user_trip: { start_date, end_date }
		})
	};
	fetch('http://localhost:3000/user_trips', options)
		.then(res => res.json())
		.then(trip => {
			dispatch({ type: 'ADD_TRIP', payload: trip });
		});
};

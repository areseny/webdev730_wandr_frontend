export const fetchUserTrips = () => dispatch => {
	fetch(`http://localhost:3000/user_trips`, {
		headers: { Authorization: localStorage.getItem('jwt') }
	})
		.then(res => res.json())
		.then(json => {
			const userTrips = json.map(ut => ({
				name: ut.trip.name,
				description: ut.trip.description,
				duration: ut.trip.duration,
				startDate: ut.start_date,
				endDate: ut.end_date,
				ratings: ut.ratings
			}));
			dispatch({ type: 'FETCH_USER_TRIPS', userTrips });
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
		.then(json => {
			dispatch({
				type: 'ADD_TRIP',
				newTrip: {
					id: json.user_trip.id,
					name: json.trip.name,
					description: json.trip.description,
					duration: json.trip.duration,
					startDate: json.user_trip.start_date,
					endDate: json.user_trip.end_date
				}
			});
		});
};

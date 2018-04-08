export const fetchTrips = userId => dispatch => {
	fetch(`http://localhost:3000/users/${userId}`)
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'FETCH_USER_TRIPS', payload: json.trips });
		});
};

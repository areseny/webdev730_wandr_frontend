export const fetchActivities = (tripId, history) => dispatch => {
	fetch(`http://localhost:3000/trips/tripId`, {
		headers: { Authorization: localStorage.getItem('jwt') }
	})
		.then(res => res.json())
		.then(json => {
			console.log;
		});
};

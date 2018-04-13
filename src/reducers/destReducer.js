const defaultState = { targetTripDestinations: [], targetDestination: {} };

// userDestinations: [],

export default function(state = defaultState, action) {
	switch (action.type) {
		// case 'FETCH_USER_TRIPS':
		// 	const userDestinations = action.userTrips.map(ut => {
		// 		return { id: ut.id, destinations: ut.destinations };
		// 	});
		// 	return { ...state, userDestinations: userDestinations };
		// case 'ADD_TRIP':
		// 	return { ...state, tripDestinations: action.newTrip.destinations };
		// case 'EDIT_TRIP':
		// 	let i = state.destinations.findIndex(
		// 		d => d.userTripId === action.editedTripId
		// 	);
		// 	let postEditUt = state.destinations
		// 		.slice(0, i)
		// 		.concat(action.editedTrip)
		// 		.concat(state.destinations.slice(i + 1));
		// 	return { ...state, destinations: postEditUt, trip: action.editedTrip };
		default:
			return state;
	}
}

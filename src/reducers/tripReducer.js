const defaultState = { userTrips: [], trip: {} };

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USER_TRIPS':
			return { ...state, userTrips: action.userTrips };
		case 'FETCH_TRIP':
			return { ...state, trip: action.trip };
		case 'ADD_TRIP':
			return { ...state, userTrips: [...state.userTrips, action.newTrip] };
		case 'EDIT_TRIP':
			let i = state.userTrips.findIndex(
				t => t.userTripId === action.editedTripId
			);
			let postEditUt = state.userTrips
				.slice(0, i)
				.concat(action.editedTrip)
				.concat(state.userTrips.slice(i + 1));
			return { ...state, userTrips: postEditUt, trip: action.editedTrip };
		case 'DELETE_TRIP':
			let j = state.userTrips.findIndex(
				t => t.userTripId === action.userTripId
			);
			let postDeleteUt = state.userTrips
				.slice(0, j)
				.concat(state.userTrips.slice(j + 1));
			return { ...state, userTrips: postDeleteUt, trip: {} };
		default:
			return state;
	}
}

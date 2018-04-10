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
			return { ...state, trip: action.editedTrip };
		case 'DELETE_TRIP':
			const index = state.userTrips.findIndex(t => t.id === action.userTripId);
			const newUserTrips = state.userTrips
				.slice(0, index)
				.concat(state.userTrips.slice(index));
			return { ...state, userTrips: newUserTrips, trip: {} };
		default:
			return state;
	}
}

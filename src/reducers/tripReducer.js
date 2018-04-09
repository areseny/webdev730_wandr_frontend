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
		default:
			return state;
	}
}

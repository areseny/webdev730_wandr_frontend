const defaultState = { userTrips: [], userTrip: {} };

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USER_TRIPS':
			return { ...state, userTrips: action.userTrips };
		case 'FETCH_USER_TRIP':
			return { ...state, userTrip: action.userTrip };
		case 'ADD_TRIP':
			return { ...state, userTrips: [...state.userTrips, action.newTrip] };
		case 'EDIT_TRIP':
			return { ...state, userTrip: action.editedTrip };
		default:
			return state;
	}
}

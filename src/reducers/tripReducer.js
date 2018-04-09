const defaultState = { userTrips: [] };

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USER_TRIPS':
			return { ...state, userTrips: action.userTrips };
		case 'ADD_TRIP':
			return { ...state, userTrips: [...state.userTrips, action.newTrip] };
		default:
			return state;
	}
}

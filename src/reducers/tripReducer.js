const defaultState = { userTrips: [] };

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USER_TRIPS':
			return { ...state, userTrips: action.payload };
		default:
			return state;
	}
}

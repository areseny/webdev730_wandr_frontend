const defaultState = { userTrips: [] };

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USER_TRIPS':
			const trips = action.payload.map(ut => {
				let userTripInfo = {
					startDate: ut.start_date,
					endDate: ut.end_date,
					ratings: ut.ratings
				};
				return { ...ut.trip, ...userTripInfo };
			});
			return { ...state, userTrips: trips };
		case 'ADD_TRIP':
			return { ...state, userTrips: [...state.userTrips, action.payload] };
		default:
			return state;
	}
}

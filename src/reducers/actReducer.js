const defaultState = { activities: [], activity: {} };

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_ACTIVITIES':
			return { ...state, activities: action.activities };
		case 'ADD_ACTIVITY':
			return {
				...state,
				activities: [...state.activities, action.newActivity]
			};
		case 'EDIT_ACTIVITY':
			let i = state.userTrips.findIndex(t => t.id === action.editedTripId);
			let postEditAct = state.userTrips
				.slice(0, i)
				.concat(action.editedTrip)
				.concat(state.userTrips.slice(i));
			return { ...state, userTrips: postEditAct, trip: action.editedTrip };
		// case 'DELETE_ACTIVITY':
		// 	let j = state.userTrips.findIndex(t => t.id === action.userTripId);
		// 	let postDeleteAct = state.userTrips
		// 		.slice(0, j)
		// 		.concat(state.userTrips.slice(j));
		// 	return { ...state, userTrips: postDeleteAct, activity: {} };
		default:
			return state;
	}
}

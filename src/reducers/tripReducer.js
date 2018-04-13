const defaultState = { userTrips: [], targetTrip: {} };

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USER_TRIPS':
			return { ...state, userTrips: action.userTrips };
		case 'SET_TARGET_TRIP':
			const targetTrip = state.userTrips.find(
				ut => ut.id === Number(action.id)
			);
			return { ...state, targetTrip };
		case 'ADD_TRIP':
			return { ...state, userTrips: [...state.userTrips, action.newTrip] };
		case 'EDIT_TRIP':
			const i = state.userTrips.findIndex(
				t => t.id === Number(action.editedTripId)
			);
			const editedUserTrips = state.userTrips
				.slice(0, i)
				.concat(action.editedTrip)
				.concat(state.userTrips.slice(i + 1));
			return {
				...state,
				userTrips: editedUserTrips,
				targetTrip: action.editedTrip
			};
		case 'DELETE_TRIP':
			const j = state.userTrips.findIndex(t => t.id === Number(action.id));
			const postDeleteUserTrips = state.userTrips
				.slice(0, j)
				.concat(state.userTrips.slice(j + 1));
			return { ...state, userTrips: postDeleteUserTrips, targetTrip: {} };

		case 'ADD_ACTIVITY':
			const ttNewAct = {
				...state.targetTrip,
				activities: [...state.targetTrip.activities, action.newActivity]
			};
			const z = state.userTrips.findIndex(
				t => t.id === Number(state.targetTrip.id)
			);
			const utNewAct = state.userTrips
				.slice(0, z)
				.concat(ttNewAct)
				.concat(state.userTrips.slice(z + 1));
			return {
				...state,
				userTrips: utNewAct,
				targetTrip: ttNewAct
			};
		case 'EDIT_ACTIVITY':
			const y = state.targetTrip.activities.findIndex(
				a => a.id === Number(action.editedActivity.id)
			);
			const actArr = state.targetTrip.activities
				.slice(0, y)
				.concat(action.editedActivity)
				.concat(state.targetTrip.activities.slice(y + 1));
			const ttEditedAct = { ...state.targetTrip, activities: actArr };
			const x = state.userTrips.findIndex(
				t => t.id === Number(state.targetTrip.id)
			);
			const utEditedActivity = state.userTrips
				.slice(0, x)
				.concat(ttEditedAct)
				.concat(state.userTrips.slice(x + 1));
			return {
				...state,
				userTrips: utEditedActivity,
				targetTrip: ttEditedAct
			};

		default:
			return state;
	}
}

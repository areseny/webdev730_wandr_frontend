const defaultState = { userTrips: [], targetTrip: {}, targetDestination: {} };

const tripIndex = state =>
	state.userTrips.findIndex(ut => ut.id === state.targetTrip.id);

const destinationIndex = state =>
	state.targetTrip.destinations.findIndex(
		d => d.id === state.targetDestination.id
	);

const activityIndex = (state, activityId) =>
	state.targetDestination.activities.findIndex(
		a => a.id === Number(activityId)
	);

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
			const editedUserTrips = state.userTrips
				.slice(0, tripIndex(state))
				.concat(action.editedTrip)
				.concat(state.userTrips.slice(tripIndex(state) + 1));
			return {
				...state,
				userTrips: editedUserTrips,
				targetTrip: action.editedTrip
			};
		case 'DELETE_TRIP':
			const postDeleteUserTrips = state.userTrips.filter(
				t => t.id !== Number(action.id)
			);
			return { ...state, userTrips: postDeleteUserTrips, targetTrip: {} };

		case 'SET_TARGET_DESTINATION':
			const targetDestination = state.targetTrip.destinations.find(
				d => d.id === Number(action.id)
			);
			return { ...state, targetDestination };

		case 'ADD_ACTIVITY':
			const destNewAct = {
				...targetDestination,
				activities: [...state.targetDestination.activities, action.newActivity]
			};
			const ttNewAct = {
				...state.targetTrip,
				destinations: state.targetTrip.destinations
					.slice(0, destinationIndex(state))
					.concat(destNewAct)
					.concat(
						state.targetTrip.destinations.slice(destinationIndex(state) + 1)
					)
			};
			const utNewAct = state.userTrips
				.slice(0, tripIndex(state))
				.concat(ttNewAct)
				.concat(state.userTrips.slice(tripIndex(state) + 1));
			return {
				...state,
				userTrips: utNewAct,
				targetTrip: ttNewAct,
				targetDestination: destNewAct
			};
		case 'EDIT_ACTIVITY':
			const destEditedAct = {
				...state.targetDestination,
				activities: state.targetDestination.activities
					.slice(0, activityIndex(state, action.editedActivity.id))
					.concat(action.editedActivity)
					.concat(
						state.targetDestination.activities.slice(
							activityIndex(state, action.editedActivity.id)
						)
					)
			};
			const ttEditedAct = {
				...state.targetTrip,
				destinations: state.targetTrip.destinations
					.slice(0, destinationIndex(state))
					.concat(destEditedAct)
					.concat(
						state.targetTrip.destinations.slice(destinationIndex(state) + 1)
					)
			};
			const utEditedAct = state.userTrips
				.slice(0, tripIndex(state))
				.concat(ttEditedAct)
				.concat(state.userTrips.slice(tripIndex(state) + 1));
			return {
				...state,
				userTrips: utEditedAct,
				targetTrip: ttEditedAct,
				targetDestination: destEditedAct
			};

		case 'DELETE_ACTIVITY':
			const actArr = state.targetDestination.activities.filter(
				a => a.id !== Number(action.payload.id)
			);
			const destDeletedAct = { ...state.targetDestination, activities: actArr };
			const ttDeletedAct = {
				...state.targetTrip,
				destinations: state.targetTrip.destinations
					.slice(0, destinationIndex(state))
					.concat(destDeletedAct)
					.concat(
						state.targetTrip.destinations.slice(destinationIndex(state) + 1)
					)
			};
			const utDeletedAct = state.userTrips
				.slice(0, tripIndex(state))
				.concat(ttDeletedAct)
				.concat(state.userTrips.slice(tripIndex(state) + 1));
			return {
				...state,
				userTrips: utDeletedAct,
				targetTrip: ttDeletedAct,
				targetDestination: destDeletedAct
			};
		default:
			return state;
	}
}

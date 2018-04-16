const defaultState = { userTrips: [], targetTrip: {}, targetDestination: {} };

let nextActivities;
let nextDestinations;
let nextUserTrips;

const tripIndex = state => state.userTrips.indexOf(state.targetTrip);

const destinationIndex = state =>
	state.targetTrip.destinations.indexOf(state.targetDestination);

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
			nextUserTrips = [...state.userTrips];
			nextUserTrips.splice(tripIndex(state), 1, action.editedTrip);
			return {
				...state,
				userTrips: nextUserTrips,
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
			nextActivities = [
				...state.targetDestination.activities,
				action.newActivity
			];
			const destNewAct = {
				...targetDestination,
				activities: nextActivities
			};
			nextDestinations = [...state.targetTrip.destinations];
			nextDestinations.splice(destinationIndex(state), 1, destNewAct);
			const ttNewAct = { ...state.targetTrip, destinations: nextDestinations };
			nextUserTrips = [...state.userTrips];
			nextUserTrips.splice(tripIndex(state), 1, ttNewAct);
			return {
				...state,
				userTrips: nextUserTrips,
				targetTrip: ttNewAct,
				targetDestination: destNewAct
			};
		case 'EDIT_ACTIVITY':
			nextActivities = [...state.targetDestination.activities];
			nextActivities.splice(
				activityIndex(state, action.editedActivity.id),
				1,
				action.editedActivity
			);
			const destEditedAct = {
				...state.targetDestination,
				activities: nextActivities
			};
			nextDestinations = [...state.targetTrip.destinations];
			nextDestinations.splice(destinationIndex(state), 1, destEditedAct);
			const ttEditedAct = {
				...state.targetTrip,
				destinations: nextDestinations
			};
			nextUserTrips = [...state.userTrips];
			nextUserTrips.splice(tripIndex(state), 1, ttEditedAct);
			return {
				...state,
				userTrips: nextUserTrips,
				targetTrip: ttEditedAct,
				targetDestination: destEditedAct
			};
		case 'DELETE_ACTIVITY':
			nextActivities = state.targetDestination.activities.filter(
				a => a.id !== Number(action.payload.id)
			);
			const destDeletedAct = {
				...state.targetDestination,
				activities: nextActivities
			};
			nextDestinations = [...state.targetTrip.destinations];
			nextDestinations.splice(destinationIndex(state), 1, destDeletedAct);
			const ttDeletedAct = {
				...state.targetTrip,
				destinations: nextDestinations
			};
			nextUserTrips = [...state.userTrips];
			nextUserTrips.splice(tripIndex(state), 1, ttDeletedAct);

			return {
				...state,
				userTrips: nextUserTrips,
				targetTrip: ttDeletedAct,
				targetDestination: destDeletedAct
			};
		default:
			return state;
	}
}

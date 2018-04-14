const defaultState = { userTrips: [], targetTrip: {}, targetDestination: {} };

const targetTripIndex = state =>
	state.userTrips.findIndex(ut => ut.id === state.targetTrip.id);

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USER_TRIPS':
			return { ...state, userTrips: action.userTrips };
		case 'SET_TARGET_TRIP':
			const targetTrip = state.userTrips.find(
				ut => ut.id === Number(action.id)
			);
			console.log(targetTrip);
			return { ...state, targetTrip };
		case 'ADD_TRIP':
			return { ...state, userTrips: [...state.userTrips, action.newTrip] };
		case 'EDIT_TRIP':
			let editTripInd = state.userTrips.findIndex(
				t => t.id === Number(action.editedTripId)
			);
			const editedUserTrips = state.userTrips
				.slice(0, editTripInd)
				.concat(action.editedTrip)
				.concat(state.userTrips.slice(editTripInd + 1));
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
		case 'ADD_ACTIVITY':
			const ttNewAct = {
				...state.targetTrip,
				activities: [...state.targetTrip.activities, action.newActivity]
			};
			let i = state.userTrips.findIndex(
				t => t.id === Number(state.targetTrip.id)
			);
			const utNewAct = state.userTrips
				.slice(0, i)
				.concat(ttNewAct)
				.concat(state.userTrips.slice(i + 1));
			return {
				...state,
				userTrips: utNewAct,
				targetTrip: ttNewAct
			};
		case 'EDIT_ACTIVITY':
			let editActInd = state.targetTrip.activities.findIndex(
				a => a.id === Number(action.editedActivity.id)
			);
			let editActArr = state.targetTrip.activities
				.slice(0, editActInd)
				.concat(action.editedActivity)
				.concat(state.targetTrip.activities.slice(editActInd + 1));
			const ttEditedAct = { ...state.targetTrip, activities: editActArr };
			const editActUtInd = state.userTrips.findIndex(
				t => t.id === Number(state.targetTrip.id)
			);
			const utEditedAct = state.userTrips
				.slice(0, editActUtInd)
				.concat(ttEditedAct)
				.concat(state.userTrips.slice(editActUtInd + 1));
			return {
				...state,
				userTrips: utEditedAct,
				targetTrip: ttEditedAct
			};
		case 'DELETE_ACTIVITY':
			// find destination
			const destination = state.targetTrip.destinations.find(
				d => d.id === Number(action.payload.destinationId)
			);
			// delete activity from array
			const postDeleteActArr = destination.activities.filter(
				a => a.id !== Number(action.payload.id)
			);
			// update destination's array of activities
			destination.activities = postDeleteActArr;

			// update destinations array
			const postDeleteActDestArr = state.targetTrip.destinations.slice(0);

			// update targetTrip

			const postDeleteActTt = {
				...state.targetTrip,
				destinations: postDeleteActArr
			};
			// update userTrips with updated targetTrip
			const postDeleteActUt = state.userTrips
				.slice(0, targetTripIndex(state))
				.concat(postDeleteActTt)
				.concat(state.userTrips.slice(targetTripIndex(state) + 1));
			return {
				...state,
				userTrips: postDeleteActUt,
				targetTrip: postDeleteActTt
			};
		default:
			return state;
	}
}

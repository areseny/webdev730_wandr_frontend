// const defaultState = { targetTripActivities: [], targetActivity: {} };
//
// export default function(state = defaultState, action) {
// 	switch (action.type) {
// 		// case 'FETCH_USER_TRIPS':
// 		// 	const userActivities = action.userTrips.map(ut => {
// 		// 		return { id: ut.id, targetTripActivities: ut.activities };
// 		// 	});
// 		// 	return { ...state, userActivities: userActivities };
// 		case 'ADD_ACTIVITY':
// 			return {
// 				...state,
// 				targetTripActivities: [...state.activities, action.newActivity]
// 			};
// 		// case 'EDIT_ACTIVITY':
// 		// 	let i = state.activities.findIndex(
// 		// 		a => a.id === action.editedActivity.id
// 		// 	);
// 		// 	let postEditActivities = state.activities
// 		// 		.slice(0, i)
// 		// 		.concat(action.editedActivity)
// 		// 		.concat(state.activities.slice(i + 1));
// 		// 	return {
// 		// 		...state,
// 		// 		targetTripActivities: postEditActivities,
// 		// 		targetActivity: {}
// 		// 	};
// 		// case 'DELETE_ACTIVITY':
// 		// 	let j = state.activities.findIndex(a => a.id === action.id);
// 		// 	let postDeleteActivities = state.targetTripActivities
// 		// 		.slice(0, j)
// 		// 		.concat(state.targetTripActivities.slice(j + 1));
// 		// 	return { ...state, activities: postDeleteActivities };
// 		// case 'UPDATE_TARGET_ACTIVITY':
// 		// 	return { ...state, targetActivity: action.activity };
// 		default:
// 			return state;
// 	}
// }

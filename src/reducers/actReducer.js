const defaultState = { activities: [], targetActivity: {} };

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
			let i = state.activities.findIndex(
				a => a.id === action.editedActivity.id
			);
			let postEditActivities = state.activities
				.slice(0, i)
				.concat(action.editedActivity)
				.concat(state.activities.slice(i + 1));
			return {
				...state,
				activities: postEditActivities,
				activitiy: action.editedActivity
			};
		case 'DELETE_ACTIVITY':
			let j = state.activities.findIndex(a => a.id === action.id);
			let postDeleteActivities = state.activities
				.slice(0, j)
				.concat(state.activities.slice(j + 1));
			return { ...state, activities: postDeleteActivities };
		case 'UPDATE_TARGET_ACTIVITY':
			return { ...state, targetActivity: action.activity };
		default:
			return state;
	}
}

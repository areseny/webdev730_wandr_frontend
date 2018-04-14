const defaultState = { targetDestination: {} };

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'UPDATE_TARGET_DESTINATION':
			return { ...state, targetDestination: action.destination };
		default:
			return state;
	}
}

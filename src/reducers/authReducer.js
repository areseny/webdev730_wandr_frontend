const defaultState = {
	loggedIn: false,
	currentUser: null
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USER':
			return { ...state, currentUser: action.payload, loggedIn: true };
		case 'LOG_OUT':
			return { ...state, currentUser: null, loggedIn: false };
		default:
			return state;
	}
}

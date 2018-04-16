const defaultState = {
	allUsers: [],
	friends: [],
	pendingFriends: [],
	requestedFriends: [],
	strangers: []
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USERS':
			return {
				...state,
				allUsers: action.payload.allUsers,
				friends: action.payload.friends,
				pendingFriends: action.payload.pendingFriends,
				requestedFriends: action.payload.requestedFriends,
				strangers: action.payload.strangers
			};
		case 'ADD_FRIEND':
			return {
				...state,
				requestedFriends: [...state.requestedFriends, action.friend]
			};
		case 'CANCEL_FRIEND_REQUEST':
			return {
				...state,
				requestedFriends: [...state.requestedFriends].filter(
					f => f.id !== action.friend.id
				)
			};
		case 'ACCEPT_FRIEND_REQUEST':
			return {
				...state,
				friends: [...state.friends, action.friend],
				pendingFriends: [...state.pendingFriends].filter(
					f => f.id !== action.friend.id
				)
			};
		case 'REJECT_FRIEND_REQUEST':
			return {
				...state,
				pendingFriends: [...state.pendingFriends].filter(
					f => f.id !== action.payload.id
				)
			};
		default:
			return state;
	}
}

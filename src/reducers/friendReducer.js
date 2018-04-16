const defaultState = {
	allUsers: [],
	friends: [],
	pendingFriends: [],
	requestedFriends: []
};

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USERS':
			return {
				...state,
				allUsers: action.payload.allUsers,
				friends: action.payload.friends,
				pendingFriends: action.payload.pendingFriends,
				requestedFriends: action.payload.requestedFriends
			};
		case 'SEND_FRIEND_INVITE':
			return {
				...state,
				requestedFriends: [...state.requestedFriends, action.friend]
			};
		case 'CANCEL_FRIEND_INVITE':
			return {
				...state,
				requestedFriends: [...state.requestedFriends].filter(
					f => f.id !== action.friend.id
				)
			};
		case 'ACCEPT_FRIEND_INVITE':
			return {
				...state,
				friends: [...state.friends, action.friend],
				pendingFriends: [...state.pendingFriends].filter(
					f => f.id !== action.friend.id
				)
			};
		case 'REJECT_FRIEND_INVITE':
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

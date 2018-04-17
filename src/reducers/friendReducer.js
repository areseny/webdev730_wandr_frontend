const defaultState = {
	friends: [],
	pendingFriends: [],
	requestedFriends: [],
	strangers: []
};

let targetFriend;
let nextFriends;

export default function(state = defaultState, action) {
	switch (action.type) {
		case 'FETCH_USERS':
			return {
				...state,
				friends: action.payload.friends,
				pendingFriends: action.payload.pendingFriends,
				requestedFriends: action.payload.requestedFriends,
				strangers: action.payload.strangers
			};
		case 'ADD_FRIEND':
			return {
				...state,
				requestedFriends: [...state.requestedFriends, action.friend],
				strangers: [...state.strangers].filter(s => {
					return s.id !== action.friend.id;
				})
			};
		case 'CANCEL_REQUEST':
			let i = [...state.requestedFriends].findIndex(
				f => f.id === action.friendId
			);
			let nextRequestedFriends = [...state.requestedFriends];
			targetFriend = nextRequestedFriends.splice(i, 1)[0];
			return {
				...state,
				requestedFriends: nextRequestedFriends,
				strangers: [...state.strangers, targetFriend]
			};
		case 'ACCEPT_REQUEST':
			return {
				...state,
				friends: [...state.friends, action.friend],
				pendingFriends: [...state.pendingFriends].filter(
					f => f.id !== action.friend.id
				)
			};
		case 'REJECT_REQUEST':
			return {
				...state,
				pendingFriends: [...state.pendingFriends].filter(
					f => f.id !== action.stranger.id
				),
				strangers: [...state.strangers, action.stranger]
			};
		case 'UNFRIEND':
			let j = [...state.friends].findIndex(f => f.id === action.friendId);
			nextFriends = [...state.friends];
			targetFriend = nextFriends.splice(j, 1)[0];
			return {
				...state,
				friends: nextFriends,
				strangers: [...state.strangers, targetFriend]
			};
		case 'SEND_MESSAGE':
			let x = state.friends.findIndex(
				f => f.id === Number(action.message.receiver_id)
			);
			targetFriend = {
				...state.friends[x],
				received_messages: [
					...state.friends[x].received_messages,
					action.message
				]
			};
			nextFriends = [...state.friends];
			nextFriends.splice(x, 1, targetFriend);
			return { ...state, friends: nextFriends };
		case 'RECEIVE_MESSAGE':
			let y = state.friends.findIndex(
				f => f.id === Number(action.message.sender_id)
			);
			targetFriend = {
				...state.friends[y],
				sent_messages: [...state.friends[y].sent_messages, action.message]
			};
			nextFriends = [...state.friends];
			nextFriends.splice(x, 1, targetFriend);
			return { ...state, friends: nextFriends };
		default:
			return state;
	}
}

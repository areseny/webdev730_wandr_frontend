export const fetchUsers = () => dispatch => {
	const options = { headers: { Authorization: localStorage.getItem('jwt') } };
	fetch(`http://localhost:3000/users`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'FETCH_USERS',
				payload: {
					allUsers: json.all,
					friends: json.friends,
					pendingFriends: json.pending_friends,
					requestedFriends: json.requested_friends,
					strangers: json.strangers
				}
			});
		});
};

export const addFriend = friendId => dispatch => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({ friend_id: friendId })
	};
	fetch(`http://localhost:3000/friendships`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'ADD_FRIEND',
				friend: parseFriendJson(json)
			});
		});
};

// export const cancelRequest = friendId => dispatch => {
// 	fetch(`http://localhost:3000/friendships`, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Accept: 'application/json',
// 			Authorization: localStorage.getItem('jwt')
// 		},
// 		body: JSON.stringify({ friend_id: friendId })
// 	})
// 		.then(res => res.json())
// 		.then(json => {
// 			dispatch({
// 				type: 'CANCEL_REQUEST',
// 				payload: res
// 			});
// 		});
// };

export const acceptRequest = friendId => dispatch => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({ friend_id: friendId, accepted: true })
	};
	return fetch(`http://localhost:3000/friendships/update`, options)
		.then(res => res.json())
		.then(console.log);
};

export const rejectRequest = friendId => dispatch => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({ friend_id: friendId, accepted: false })
	};
	return fetch(`http://localhost:3000/friendships/update`, options)
		.then(res => res.json())
		.then(console.log);
};

const parseFriendJson = json => ({
	friendId: json.friend_id,
	username: json.friend.username,
	firstname: json.friend.firstname,
	lastname: json.friend.lastname,
	hometown: json.friend.hometown,
	dob: json.friend.dob
});
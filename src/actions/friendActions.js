export const fetchUsers = () => dispatch => {
	const options = { headers: { Authorization: localStorage.getItem('jwt') } };
	fetch(`http://localhost:3000/users`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'FETCH_USERS',
				payload: {
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

export const cancelRequest = friendId => dispatch => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({ friend_id: friendId })
	};

	return fetch(`http://localhost:3000/friendships/cancel`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'CANCEL_REQUEST', friendId });
		});
};

export const acceptRequest = friendId => dispatch => {
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({ friend_id: friendId, accept: true })
	};
	return fetch(`http://localhost:3000/friendships/update`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'ACCEPT_REQUEST', friend: parseFriendJson(json) });
		});
};

export const rejectRequest = friendId => dispatch => {
	const options = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({ friend_id: friendId, accept: false })
	};
	return fetch(`http://localhost:3000/friendships/update`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'REJECT_REQUEST' });
		});
};

export const unfriend = friendId => dispatch => {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({ friend_id: friendId })
	};
	return fetch(`http://localhost:3000/friendships/destroy`, options)
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'UNFRIEND', friendId });
		});
};

const parseFriendJson = json => ({
	id: json.friend_id,
	username: json.friend.username,
	firstname: json.friend.firstname,
	lastname: json.friend.lastname,
	hometown: json.friend.hometown,
	email: json.friend.email,
	photo: json.friend.photo,
	dob: json.friend.dob
});

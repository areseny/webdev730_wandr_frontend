export const fetchUsers = () => dispatch => {
	fetch(`http://localhost:3000/users`, {
		headers: { Authorization: localStorage.getItem('jwt') }
	})
		.then(res => res.json())
		.then(json => {
			dispatch({
				type: 'FETCH_USERS',
				payload: {
					allUsers: json.all,
					friends: json.friends,
					pendingFriends: json.pending_friends,
					requestedFriends: json.requested_friends
				}
			});
		});
};

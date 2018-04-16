export const fetchUsers = () => {
	return dispatch => {
		adapter.friends.fetchUsers().then(res => {
			dispatch({
				type: 'GET_USERS',
				payload: {
					all: res.all,
					unfriended: res.unfriended,
					pendingFriends: res.pending_friends,
					requestedFriends: res.requested_friends,
					acceptedFriends: res.accepted_friends
				}
			});
		});
	};
};

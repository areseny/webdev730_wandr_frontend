export const sendMessage = (friendId, content) => dispatch => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: localStorage.getItem('jwt')
		},
		body: JSON.stringify({ id: friendId, content })
	};
	fetch(`http://localhost:3000/users/add_message`, options)
		.then(res => res.json())
		.then(message => {
			dispatch({ type: 'SEND_MESSAGE', message });
		});
};

export const receiveMessage = message => {
	return { type: 'RECEIVE_MESSAGE', message };
};

export const signUp = (
	{ firstname, lastname, hometown, username, password },
	history
) => dispatch => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ user: { firstname, lastname, username, password } })
	};
	fetch('http://localhost:3000/signup', options)
		.then(res => res.json())
		.then(json => {
			localStorage.setItem('jwt', json.jwt);
			dispatch({ type: 'FETCH_USER', payload: json.user });
		})
		.then(() => {
			history.push('/home');
		});
};

export const logIn = (username, password, history) => dispatch => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ user: { username, password } })
	};
	fetch('http://localhost:3000/login', options)
		.then(res => res.json())
		.then(json => {
			if (json.error) {
				alert(json.error);
			} else {
				localStorage.setItem('jwt', json.jwt);
				dispatch({ type: 'FETCH_USER', payload: json.user });
			}
		})
		.then(() => {
			history.push('/home');
		});
};

export const fetchUser = (jwt, history) => dispatch => {
	const options = { headers: { Authorization: jwt } };
	fetch('http://localhost:3000/current_user', options)
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'FETCH_USER', payload: json });
		});
};

export const logOut = history => dispatch => {
	localStorage.removeItem('jwt');
	dispatch({ type: 'LOG_OUT' });
	history.push('/');
};

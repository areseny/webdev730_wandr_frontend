export const signUp = (
	{ firstname, lastname, hometown, username, password },
	history
) => dispatch => {
	fetch('http://localhost:3000/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ user: { firstname, lastname, username, password } })
	})
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
	fetch('http://localhost:3000/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ user: { username, password } })
	})
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
	fetch('http://localhost:3000/current_user', {
		headers: { Authorization: jwt }
	})
		.then(res => res.json())
		.then(json => {
			dispatch({ type: 'FETCH_USER', payload: json });
		})
		.then(() => {
			history.push('/home');
		});
};

export const logOut = history => dispatch => {
	localStorage.removeItem('jwt');
	dispatch({ type: 'LOG_OUT' });
	history.push('/');
};

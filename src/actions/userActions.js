export function signUp(username, password, history) {
	return function(dispatch) {
		fetch('http://localhost:3000/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ user: { username, password } })
		})
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('jwt', json.jwt);
				dispatch({ type: 'GET_USER', payload: json.user });
			})
			.then(() => {
				history.push('/');
			});
	};
}

export function logIn(username, password, history) {
	return function(dispatch) {
		fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ username, password })
		})
			.then(res => res.json())
			.then(json => {
				if (json.error) {
					alert(json.error);
				} else {
					localStorage.setItem('jwt', json.jwt);
					dispatch({ type: 'GET_USER', payload: json.user });
				}
			})
			.then(() => {
				history.push('/');
			});
	};
}

export function getUser(jwt, history) {
	return function(dispatch) {
		fetch('http://localhost:3000/current_user', {
			headers: { Authorization: jwt }
		})
			.then(res => res.json())
			.then(json => {
				dispatch({ type: 'GET_USER', payload: json });
			})
			.then(() => {
				history.push('/');
			});
	};
}

export function logOut(history) {
	return function(dispatch) {
		localStorage.removeItem('jwt');
		dispatch({ type: 'LOG_OUT' });
		history.push('/login');
	};
}

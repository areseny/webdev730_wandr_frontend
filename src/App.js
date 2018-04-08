import React, { Component } from 'react';
import Landing from './app/Landing';
import Login from './app/Login';
import Signup from './app/Signup';
import Home from './users/Home';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions/authActions';

class App extends Component {
	componentDidMount() {
		let jwt = localStorage.getItem('token');
		if (jwt && !this.props.currentUser) {
			this.props.fetchUser(jwt, this.props.history);
		}
		// this.props.fetchTrips()
	}

	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route
						path="/login"
						render={renderProps => <Login history={renderProps.history} />}
					/>
					<Route
						path="/signup"
						render={renderProps => <Signup history={renderProps.history} />}
					/>
					<Route
						path="/home"
						render={renderProps => <Home history={renderProps.history} />}
					/>
				</Switch>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: state.auth.loggedIn,
		currentUser: state.auth.currentUser
	};
}

export default withRouter(connect(mapStateToProps, { fetchUser })(App));

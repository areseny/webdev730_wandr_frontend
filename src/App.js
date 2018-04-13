import React, { Component } from 'react';
import Landing from './app/Landing';
import Login from './app/Login';
import Signup from './app/Signup';
import Home from './app/Home';
import TripsList from './trips/TripsList';
import TripPage from './trips/TripPage';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions/authActions';
import { fetchUserTrips } from './actions/tripActions';

class App extends Component {
	componentDidMount() {
		let jwt = localStorage.getItem('token');
		if (jwt && !this.props.currentUser) {
			this.props.fetchUser(jwt, this.props.history);
		}
		this.props.fetchUserTrips();
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
					<Route
						path="/mytrips/:id"
						render={renderProps => <TripPage history={renderProps.history} />}
					/>
					<Route
						path="/mytrips"
						render={renderProps => <TripsList history={renderProps.history} />}
					/>
				</Switch>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn,
	currentUser: state.auth.currentUser,
	userTrips: state.trip.userTrips
});

export default withRouter(
	connect(mapStateToProps, { fetchUser, fetchUserTrips })(App)
);

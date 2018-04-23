import React, { Component } from 'react';
import Landing from './app/Landing';
import Login from './app/Login';
import Home from './app/Home';
import TripsList from './trips/TripsList';
import TripPage from './trips/TripPage';
import AddTripForm from './trips/AddTripForm';
import FriendsContainer from './friends/FriendsContainer';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions/authActions';
import { fetchUserTrips } from './actions/tripActions';
import { fetchUsers } from './actions/friendActions';
import { receiveMessage } from './actions/chatActions';
import { ActionCable } from 'react-actioncable-provider';

class App extends Component {
	componentDidMount() {
		let jwt = localStorage.getItem('token');
		if (jwt && !this.props.currentUser) {
			this.props.fetchUser(jwt, this.props.history);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.loggedIn) {
			this.props.fetchUserTrips();
		}
	}

	handleSocketResponse = message => {
		this.props.receiveMessage(message);
	};

	connectActionCable = () => (
		<ActionCable
			channel={{
				channel: 'UserChannel',
				user_id: this.props.currentUser.id
			}}
			onReceived={this.handleSocketResponse}
		/>
	);

	render() {
		return (
			<div className="App">
				{this.props.loggedIn ? this.connectActionCable() : null}
				<Switch>
					<Route
						exact
						path="/"
						render={renderProps => <Landing history={renderProps.history} />}
					/>
					<Route
						path="/login"
						render={renderProps => <Login history={renderProps.history} />}
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
						path="/addtrip"
						render={renderProps => (
							<AddTripForm history={renderProps.history} />
						)}
					/>
					<Route
						path="/mytrips"
						render={renderProps => <TripsList history={renderProps.history} />}
					/>
					<Route
						path="/friends"
						render={routerProps => (
							<FriendsContainer history={routerProps.history} />
						)}
					/>
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn,
	currentUser: state.auth.currentUser
});

export default withRouter(
	connect(mapStateToProps, {
		fetchUser,
		fetchUserTrips,
		fetchUsers,
		receiveMessage
	})(App)
);

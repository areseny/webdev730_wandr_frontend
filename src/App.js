import React, { Component } from 'react';
import Landing from './app/Landing';
import Home from './users/components/Home';
import Login from './app/Login';
import Signup from './app/Signup';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';

class App extends Component {
	componentDidMount() {
		let jwt = localStorage.getItem('token');
		if (jwt && !this.props.currentUser) {
			this.props.fetchUser(jwt, this.props.history);
		}
	}

	render() {
		return (
			<div className="App">
				<Route exact path="/" component={Landing} />
				<Route path="/home" component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
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

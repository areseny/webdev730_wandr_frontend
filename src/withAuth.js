import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUser, logOut } from './actions/authActions';

const withAuth = Component => {
	class ComponentWithAuth extends React.Component {
		state = { authCompleted: this.props.loggedIn };

		componentDidMount() {
			if (localStorage.getItem('jwt')) {
				this.props.fetchUser(localStorage.getItem('jwt'), this.props.history);
			} else {
				this.setState({ authCompleted: true });
			}
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.loggedIn) {
				this.setState({ authCompleted: true });
			}
		}

		render() {
			if (this.state.authCompleted) {
				return this.props.loggedIn ? (
					<Component {...this.props} />
				) : (
					<Redirect to="/login" />
				);
			} else {
				return null;
			}
		}
	}

	const mapStateToProps = state => ({
		loggedIn: state.auth.loggedIn,
		currentUser: state.auth.currentUser
	});

	return connect(mapStateToProps, { fetchUser, logOut })(ComponentWithAuth);
};

export default withAuth;

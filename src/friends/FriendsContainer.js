import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '../app/withAuth';
import Navbar from '../app/Navbar';
import UserCard from './UserCard';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../actions/friendActions';
import ChatroomContainer from '../chatroom/ChatroomContainer';
import { Grid } from 'semantic-ui-react';

class FriendsContainer extends Component {
	state = { loaded: false };

	componentDidMount() {
		this.props.fetchUsers();
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.allUsers || {}).length) {
			this.setState({ loaded: true });
		}
	}

	render() {
		return (
			<div>
				<Navbar history={this.props.history} />
				{this.state.loaded ? (
					<Grid columns={2} divided>
						<Grid.Column width={11}>
							<div>
								<h1>Friends</h1>
								{this.props.friends.map((u, i) => (
									<UserCard key={i} user={u} status={'friends'} />
								))}
								<h3>You've sent requests to...</h3>
								{this.props.requestedFriends.map((u, i) => (
									<UserCard
										key={i}
										user={u}
										status={'requested'}
										friendshipId={u.friendshipId}
									/>
								))}
								<h3>You have pending requests from...</h3>
								{this.props.pendingFriends.map((u, i) => (
									<UserCard key={i} user={u} status={'pending'} />
								))}
								<h3>Add more friends</h3>
								{this.props.strangers.map((u, i) => (
									<UserCard key={i} user={u} status={'strangers'} />
								))}
							</div>
						</Grid.Column>
						<Grid.Column width={5}>
							<ChatroomContainer friends={this.props.friends} />
						</Grid.Column>
					</Grid>
				) : (
					'Loading friends info...'
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	allUsers: state.friend.allUsers,
	friends: state.friend.friends,
	pendingFriends: state.friend.pendingFriends,
	requestedFriends: state.friend.requestedFriends,
	strangers: state.friend.strangers
});

export default withRouter(
	connect(mapStateToProps, { fetchUsers })(withAuth(FriendsContainer))
);

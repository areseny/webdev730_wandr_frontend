import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '../app/withAuth';
import Navbar from '../app/Navbar';
import FriendCard from './FriendCard';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../actions/friendActions';
import ChatContainer from '../chatroom/ChatContainer';
import { Grid } from 'semantic-ui-react';

class FriendsContainer extends Component {
	state = { loaded: false, chatFriendId: null };

	componentDidMount() {
		this.props.fetchUsers();
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.currentUser || {}).length) {
			this.setState({ loaded: true });
		}
	}

	switchChat = friendId => {
		this.setState({ chatFriendId: friendId });
	};

	closeChat = () => {
		this.setState({ chatFriendId: null });
	};

	render() {
		return (
			<div>
				<Navbar history={this.props.history} />
				{this.state.loaded ? (
					<Grid columns={2}>
						<Grid.Column width={11}>
							<div>
								<h1>Friends</h1>
								{this.props.friends.map((u, i) => (
									<FriendCard
										key={i}
										user={u}
										status={'friends'}
										switchChat={this.switchChat}
									/>
								))}
								<h3>You've sent requests to...</h3>
								{this.props.requestedFriends.map((u, i) => (
									<FriendCard
										key={i}
										user={u}
										status={'requested'}
										friendshipId={u.friendshipId}
									/>
								))}
								<h3>You have pending requests from...</h3>
								{this.props.pendingFriends.map((u, i) => (
									<FriendCard key={i} user={u} status={'pending'} />
								))}
								<h3>Add more friends</h3>
								{this.props.strangers.map((u, i) => (
									<FriendCard key={i} user={u} status={'strangers'} />
								))}
							</div>
						</Grid.Column>
						<Grid.Column width={5}>
							{this.state.chatFriendId ? (
								<ChatContainer
									closeChat={this.closeChat}
									friend={this.props.friends.find(
										f => f.id === this.state.chatFriendId
									)}
								/>
							) : null}
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
	friends: state.friend.friends,
	pendingFriends: state.friend.pendingFriends,
	requestedFriends: state.friend.requestedFriends,
	strangers: state.friend.strangers
});

export default withRouter(
	connect(mapStateToProps, { fetchUsers })(withAuth(FriendsContainer))
);

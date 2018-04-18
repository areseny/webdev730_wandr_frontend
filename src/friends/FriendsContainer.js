import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '../app/withAuth';
import Navbar from '../app/Navbar';
import FriendCard from './FriendCard';
import { withRouter } from 'react-router-dom';
import { fetchUsers } from '../actions/friendActions';
import ChatContainer from '../chatroom/ChatContainer';
import { Grid, Message, Icon, Card } from 'semantic-ui-react';

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
								<Card.Group>
									{this.props.friends.map((u, i) => (
										<FriendCard
											key={i}
											user={u}
											status={'friends'}
											switchChat={this.switchChat}
										/>
									))}
								</Card.Group>
								<h3>You've sent requests to...</h3>
								<Card.Group>
									{this.props.requestedFriends.map((u, i) => (
										<FriendCard
											key={i}
											user={u}
											status={'requested'}
											friendshipId={u.friendshipId}
										/>
									))}
								</Card.Group>
								<h3>You have pending requests from...</h3>
								<Card.Group>
									{this.props.pendingFriends.map((u, i) => (
										<FriendCard key={i} user={u} status={'pending'} />
									))}
								</Card.Group>
								<h3>Add more friends</h3>
								<Card.Group>
									{this.props.strangers.map((u, i) => (
										<FriendCard key={i} user={u} status={'strangers'} />
									))}
								</Card.Group>
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
					<Message icon>
						<Icon name="circle notched" color="teal" loading />
						<Message.Content>
							<Message.Header>Just one second</Message.Header>
							"We are loading your friends' info for you."
						</Message.Content>
					</Message>
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

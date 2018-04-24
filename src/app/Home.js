import React, { Component } from 'react';
import withAuth from './withAuth';
import Navbar from './Navbar';
import FriendCard from '../friends/FriendCard';
import ChatContainer from '../chatroom/ChatContainer';
import { Message, Icon, Card, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fetchUsers, unfriend } from '../actions/friendActions';
import { connect } from 'react-redux';
import moment from 'moment';

import '../stylesheets/static.css';

class Home extends Component {
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

	upcomingTrips = () =>
		this.props.userTrips.length
			? this.props.userTrips.slice(0, 6).map(
					(ut, i) =>
						new Date(ut.startDate) > new Date() ? (
							<Grid.Column key={i}>
								<Card
									id="homepage-trips-cards"
									color="teal"
									as={Link}
									to={`/mytrips/${ut.id}`}
									header={ut.name}
									description={ut.description}
									meta={`From ${moment(ut.startDate).format('LL')} to ${moment(
										ut.endDate
									).format('LL')}`}
								/>
							</Grid.Column>
						) : null
			  )
			: null;

	friends = () => (
		<Card.Group itemsPerRow={5} className="friend-card">
			{this.props.friends.map((u, i) => (
				<FriendCard
					key={i}
					user={u}
					status={'friends'}
					switchChat={this.switchChat}
				/>
			))}
		</Card.Group>
	);

	render() {
		return (
			<div>
				<Navbar history={this.props.history} />
				<h1 id="title">Welcome, {this.props.currentUser.firstname}</h1>
				<br />
				{this.state.loaded ? (
					<div className="main-container">
						<Grid divided="vertically" columns="equal">
							<h3>Upcoming Trips</h3>
							<Grid.Row columns={this.props.userTrips.length || 1}>
								{this.upcomingTrips()}
							</Grid.Row>
							<h3>Friends</h3>
							<Grid.Row columns={this.props.userTrips.length || 1}>
								{this.friends()}
							</Grid.Row>
						</Grid>
						{this.state.chatFriendId ? (
							<div className="sidebar">
								<ChatContainer
									id="chatbox-container"
									closeChat={this.closeChat}
									friend={this.props.friends.find(
										f => f.id === this.state.chatFriendId
									)}
								/>
							</div>
						) : null}
					</div>
				) : (
					<Message icon>
						<Icon name="circle notched" color="teal" loading />
						<Message.Content>
							<Message.Header>Just one second</Message.Header>
							"We are loading your info for you."
						</Message.Content>
					</Message>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userTrips: state.trip.userTrips,
	friends: state.friend.friends
});

export default connect(mapStateToProps, { fetchUsers, unfriend })(
	withAuth(Home)
);

// <Grid>
// 	<h3>Upcoming Trips</h3>
// 	<Grid.Column>{upcomingTrips}</Grid.Column>
// 	<h3>Friends</h3>
// 	<Grid.Column>{upcomingTrips}</Grid.Column>
// </Grid>

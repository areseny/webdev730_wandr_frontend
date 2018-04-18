import React from 'react';
import { connect } from 'react-redux';
import {
	addFriend,
	cancelRequest,
	acceptRequest,
	rejectRequest,
	unfriend
} from '../actions/friendActions';
import { Card, Image, Button } from 'semantic-ui-react';

const FriendCard = props => {
	const confirmUnfriend = () => {
		if (
			window.confirm(
				`Are you sure you would like to unfriend ${props.user.firstname} ?`
			)
		) {
			props.unfriend(props.user.id);
		}
	};

	const button = () => {
		switch (props.status) {
			case 'friends':
				return (
					<div className="ui two buttons">
						<Button
							basic
							color="teal"
							onClick={() => {
								props.switchChat(props.user.id);
							}}>
							Chat
						</Button>
						<Button basic color="red" onClick={confirmUnfriend}>
							Unfriend
						</Button>
					</div>
				);
			case 'requested':
				return (
					<Button
						basic
						onClick={() => {
							props.cancelRequest(props.user.id);
						}}>
						Cancel
					</Button>
				);
			case 'pending':
				return (
					<div className="ui two buttons">
						<Button
							basic
							color="green"
							onClick={() => {
								props.acceptRequest(props.user.id);
							}}>
							Accept
						</Button>
						<Button
							basic
							color="red"
							onClick={() => {
								props.rejectRequest(props.user.id);
							}}>
							Reject
						</Button>
					</div>
				);
			case 'strangers':
				return (
					<Button
						basic
						onClick={() => {
							props.addFriend(props.user.id);
						}}>
						Add Friend
					</Button>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<Card>
				<Card.Content>
					<Image
						floated="right"
						size="mini"
						src="/assets/images/avatar/large/steve.jpg"
					/>
					<Card.Header>
						{props.user.firstname} {props.user.lastname}
					</Card.Header>
					<Card.Meta>{props.user.hometown}</Card.Meta>
				</Card.Content>
				<Card.Content extra>{button()}</Card.Content>
			</Card>
		</div>
	);
};

export default connect(null, {
	addFriend,
	cancelRequest,
	acceptRequest,
	rejectRequest,
	unfriend
})(FriendCard);

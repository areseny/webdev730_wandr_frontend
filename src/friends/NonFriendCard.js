import React from 'react';
import { connect } from 'react-redux';
import {
	addFriend,
	cancelRequest,
	acceptRequest,
	rejectRequest
} from '../actions/friendActions';
import { Card, Image, Button } from 'semantic-ui-react';
import elliotPic from '../media/elliot.jpg';

const FriendCard = props => {
	const button = () => {
		switch (props.status) {
			case 'requested':
				return (
					<Button
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
						color="teal"
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
		<Card>
			<Card.Content>
				<Image floated="right" size="mini" src={elliotPic} />
				<Card.Header>
					{props.user.firstname} {props.user.lastname}
				</Card.Header>
				<Card.Meta>{props.user.hometown}</Card.Meta>
			</Card.Content>
			<Card.Content extra>{button()}</Card.Content>
		</Card>
	);
};

export default connect(null, {
	addFriend,
	cancelRequest,
	acceptRequest,
	rejectRequest
})(FriendCard);

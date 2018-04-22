import React from 'react';
import { connect } from 'react-redux';
import { unfriend } from '../actions/friendActions';
import { Card, Image, Button } from 'semantic-ui-react';
import '../stylesheets/friends.css';

const FriendCard = props => {
	const confirmUnfriend = () => {
		if (
			window.confirm(
				`Are you sure you would like to unfriend ${props.user.firstname}?`
			)
		) {
			props.unfriend(props.user.id);
		}
	};

	return (
		<Card>
			<Image src={props.user.photo} />
			<Card.Content>
				<Card.Header>
					{props.user.firstname} {props.user.lastname}
				</Card.Header>
				<Card.Meta>{props.user.hometown}</Card.Meta>
				<Card.Description>{props.user.email}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button
					color="teal"
					onClick={() => {
						props.switchChat(props.user.id);
					}}>
					Chat
				</Button>
				<a role="button" className="card-link" onClick={confirmUnfriend}>
					Unfriend
				</a>
			</Card.Content>
		</Card>
	);
};

export default connect(null, { unfriend })(FriendCard);

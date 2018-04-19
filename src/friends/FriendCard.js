import React from 'react';
import { connect } from 'react-redux';
import { unfriend } from '../actions/friendActions';
import { Card, Image, Button } from 'semantic-ui-react';
import michael from '../media/michael.jpg';
import jim from '../media/jim.png';
import bob from '../media/bob.jpg';
import ron from '../media/ron.jpg';
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

	const image = () => {
		if (props.user.firstname === 'Michael') {
			return michael;
		} else if (props.user.firstname === 'Jim') {
			return jim;
		} else if (props.user.firstname === 'Michael') {
			return michael;
		} else if (props.user.firstname === 'Bob') {
			return bob;
		} else if (props.user.firstname === 'Ron') {
			return ron;
		}
	};

	return (
		<Card>
			<Image src={image()} />
			<Card.Content>
				<Card.Header>
					{props.user.firstname} {props.user.lastname}
				</Card.Header>
				<Card.Meta>{props.user.hometown}</Card.Meta>
				<Card.Description>
					Matthew is a musician living in Nashville.
				</Card.Description>
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

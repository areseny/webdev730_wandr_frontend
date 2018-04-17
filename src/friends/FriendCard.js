import React from 'react';
import { connect } from 'react-redux';
import {
	addFriend,
	cancelRequest,
	acceptRequest,
	rejectRequest,
	unfriend
} from '../actions/friendActions';

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
					<div>
						<button
							onClick={() => {
								props.switchChat(props.user.id);
							}}>
							Chat
						</button>
						<button onClick={confirmUnfriend}>Unfriend</button>
					</div>
				);
			case 'requested':
				return (
					<button
						onClick={() => {
							props.cancelRequest(props.user.id);
						}}>
						Cancel
					</button>
				);
			case 'pending':
				return (
					<div>
						<button
							onClick={() => {
								props.acceptRequest(props.user.id);
							}}>
							Accept
						</button>
						<button
							onClick={() => {
								props.rejectRequest(props.user.id);
							}}>
							Reject
						</button>
					</div>
				);
			case 'strangers':
				return (
					<button
						onClick={() => {
							props.addFriend(props.user.id);
						}}>
						Add Friend
					</button>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			{props.user.firstname} {props.user.lastname} of {props.user.hometown}
			<br />
			{button()}
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

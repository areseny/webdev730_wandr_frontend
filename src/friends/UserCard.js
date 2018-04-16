import React from 'react';
import { connect } from 'react-redux';
import {
	addFriend,
	acceptRequest,
	rejectRequest
} from '../actions/friendActions';

const UserCard = props => {
	const generateButton = () => {
		switch (props.status) {
			case 'friends':
				return null;
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

	// const generateButton = () => {
	// 	switch (props.status) {
	// 		case 'friends':
	// 			return (
	// 				<button
	// 					onClick={() => {
	// 						props.unfriend(props.user.id);
	// 					}}>
	// 					Unfriend
	// 				</button>
	// 			);
	// 		case 'requested':
	// 			return (
	// 				<button
	// 					onClick={() => {
	// 						props.cancelRequest(props.user.id);
	// 					}}>
	// 					Cancel
	// 				</button>
	// 			);
	// 		case 'pending':
	// 			return (
	// 				<div>
	// 					<button
	// 						onClick={() => {
	// 							props.acceptRequest(props.user.id);
	// 						}}>
	// 						Accept
	// 					</button>
	// 					<button
	// 						onClick={() => {
	// 							props.rejectRequest(props.user.id);
	// 						}}>
	// 						Reject
	// 					</button>
	// 				</div>
	// 			);
	// 		case 'strangers':
	// 			return (
	// 				<button
	// 					onClick={() => {
	// 						props.addFriend(props.user.id);
	// 					}}>
	// 					Add Friend
	// 				</button>
	// 			);
	// 		default:
	// 			return null;
	// 	}
	// };
	return (
		<div>
			{props.user.firstname} {props.user.lastname} of {props.user.hometown}
			<br />
			{generateButton()}
		</div>
	);
};

export default connect(null, { addFriend, acceptRequest, rejectRequest })(
	UserCard
);
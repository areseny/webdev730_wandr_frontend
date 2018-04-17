import React, { Component } from 'react';

export default class ChatroomList extends Component {
	render() {
		return this.props.chatrooms.map(chatroom => {
			return (
				<li
					key={chatroom.id}
					onClick={() => this.props.selectRoom(chatroom.id)}>
					{chatroom.name}
				</li>
			);
		});
	}
}

import React, { Component } from 'react';
import ChatroomList from './ChatroomList';
import ChatroomBox from './ChatroomBox';

export default class ChatroomContainer extends Component {
	state = { chatrooms: [], openChatroom: null, friends: this.props.friends };

	componentDidMount() {
		fetch('http://localhost:3000/chatrooms')
			.then(res => res.json())
			.then(chatrooms => {
				this.setState({ chatrooms: chatrooms });
			});
	}

	createChatroom = e => {
		e.preventDefault();
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				name: this.state.name,
				password: this.state.password
			})
		};
		fetch(`http://localhost:3000/chatrooms`, options)
			.then(res => res.json())
			.then(chatroom => {
				this.setState({
					password: '',
					chatrooms: [...this.state.chatrooms, chatroom]
				});
			});
	};

	selectRoom = chatroomId => {
		fetch(`http://localhost:3000/chatrooms/${chatroomId}/authorize`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				name: this.state.name,
				password: this.state.password
			})
		})
			.then(res => res.json())
			.then(chatroom => {
				this.setState({ openChatroom: chatroom });
			});
	};

	handleInputChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	leaveChatroom = () => {
		this.setState({ openChatroom: null });
	};

	addMessage = message => {
		let nextChatroom = { ...this.state.openChatroom };
		nextChatroom.messages.push(message);
		this.setState({ openChatroom: nextChatroom });
	};

	render() {
		return (
			<div>
				<h3>Messenger</h3>
				{this.state.openChatroom ? (
					<ChatroomBox
						addMessage={this.addMessage}
						leaveChatroom={this.leaveChatroom}
						chatroom={this.state.openChatroom}
					/>
				) : (
					<ChatroomList
						chatrooms={this.state.chatrooms}
						selectRoom={this.selectRoom}
						friends={this.props.friends}
					/>
				)}
			</div>
		);
	}
}

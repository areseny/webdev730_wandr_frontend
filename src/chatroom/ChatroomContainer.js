import React, { Component } from 'react';
import ChatroomList from './ChatroomList';
import Chatroom from './Chatroom';

export default class ChatroomContainer extends Component {
	state = { chatrooms: [], openChatroom: null, name: '', password: '' };

	componentDidMount() {
		fetch('http://localhost:3000/chatrooms')
			.then(res => res.json())
			.then(chatrooms => {
				this.setState({
					chatrooms: chatrooms
				});
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

	removeMessage = messageId => {
		let newMessages = this.state.openChatroom.messages.filter(
			message => message.id !== messageId
		);

		let newChatroom = { ...this.state.openChatroom };

		newChatroom.messages = newMessages;

		this.setState({
			openChatroom: newChatroom
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
				password: this.state.password
			})
		})
			.then(res => res.json())
			.then(chatroom => {
				this.setState({
					openChatroom: chatroom
				});
			});
	};
	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	leaveChatroom = () => {
		this.setState({ openChatroom: null });
	};

	addMessage = message => {
		let copyChat = { ...this.state.openChatroom };
		copyChat.messages.push(message);
		this.setState({
			openChatroom: copyChat
		});
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<form onSubmit={this.createChatroom}>
					<input
						type="text"
						name="name"
						value={this.state.name}
						placeholder="Chatroom Name"
						onChange={this.handleChange}
					/>
					<input
						type="password"
						name="password"
						value={this.state.password}
						placeholder="Chatroom Password"
						onChange={this.handleChange}
					/>
					<input type="submit" value="Create Chatroom" />
				</form>

				{this.state.openChatroom ? (
					<Chatroom
						removeMessage={this.removeMessage}
						addMessage={this.addMessage}
						leaveChatroom={this.leaveChatroom}
						chatroom={this.state.openChatroom}
					/>
				) : (
					<ChatroomList
						chatrooms={this.state.chatrooms}
						selectRoom={this.selectRoom}
					/>
				)}
			</div>
		);
	}
}

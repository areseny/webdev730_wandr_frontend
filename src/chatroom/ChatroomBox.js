import React, { Component } from 'react';
import { ActionCable } from 'react-actioncable-provider';

export default class ChatroomBox extends Component {
	state = { content: '' };

	sendMesssage = e => {
		e.preventDefault();
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				content: this.state.content,
				user_id: 1
			})
		};
		fetch(
			`http://localhost:3000/chatrooms/${this.props.chatroom.id}/message`,
			options
		).then(res => {
			this.setState({
				content: ''
			});
		});
	};

	handleInputChange = e => {
		console.log('e.targe.value');
		this.setState({ content: e.target.value });
	};

	handleSocketResponse = data => {
		switch (data.type) {
			case 'ADD_MESSAGE':
				this.props.addMessage(data.payload);
				break;
			default:
				console.log(data);
		}
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<ActionCable
					channel={{
						channel: 'ChatroomChannel',
						chatroom_id: this.props.chatroom.id
					}}
					onReceived={this.handleSocketResponse}
				/>
				<h3>{this.props.chatroom.name}</h3>
				<form onSubmit={this.sendMesssage}>
					<input type="text" onChange={this.handleInputChange} />
					<input type="submit" value="Send" />
				</form>
				<ul>
					{this.props.chatroom.messages.map((m, i) => (
						<li key={i}>
							{m.username}: {m.content}
						</li>
					))}
				</ul>
				<button onClick={this.props.leaveChatRoom}>Back</button>
			</div>
		);
	}
}

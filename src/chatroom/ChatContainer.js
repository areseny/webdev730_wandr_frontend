import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/chatActions';
import { Menu, Form, Button } from 'semantic-ui-react';

// NOTE: flip send/receieve to user perspective

class ChatContainer extends Component {
	state = {
		friendId: this.props.friend.id,
		content: '',
		sentMessages: this.props.friend.received_messages,
		receivedMessages: this.props.friend.sent_messages
	};

	// sortByDate = arr => {
	// 	arr.sort((a, b) => a.created_at - b.created_at);
	// 	console.log(arr);
	// };

	componentWillReceiveProps(nextProps) {
		this.setState({
			sentMessages: nextProps.friend.received_messages,
			receivedMessages: nextProps.friend.sent_messages
		});
	}

	handleInputChange = e => {
		this.setState({ content: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.sendMessage(this.state.friendId, this.state.content);
		this.setState({ content: '' });
	};

	render() {
		return (
			<Menu vertical>
				<h3>Chat with {this.props.friend.firstname}</h3>
				<Menu.Item>
					<h5>sent:</h5>
					<ol>
						{this.state.sentMessages.map((m, i) => (
							<li key={i}>{m.content}</li>
						))}
					</ol>
					<h5>received: </h5>
					<ol>
						{this.state.receivedMessages.map((m, i) => (
							<li key={i}>{m.content}</li>
						))}
					</ol>
				</Menu.Item>
				<Form onSubmit={this.handleSubmit}>
					<Form.Input
						placeholder="Your message here..."
						rows={2}
						value={this.state.content}
						onChange={this.handleInputChange}
					/>
					<Button primary type="submit">
						Send
					</Button>
				</Form>
				<br />
				<button onClick={this.props.closeChat}>Close</button>
			</Menu>
		);
	}
}

export default connect(null, { sendMessage })(ChatContainer);

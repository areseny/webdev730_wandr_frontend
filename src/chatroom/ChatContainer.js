import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/chatActions';
import { Menu, Form, Button, Card } from 'semantic-ui-react';
import '../stylesheets/chat.css';

// NOTE: flip send/receieve to user perspective

class ChatContainer extends Component {
	state = {
		friendId: this.props.friend.id,
		content: '',
		sentMessages: this.props.friend.received_messages,
		receivedMessages: this.props.friend.sent_messages
	};

	sortedMessages = () =>
		[...this.state.sentMessages, ...this.state.receivedMessages].sort(
			(a, b) => new Date(a.created_at) - new Date(b.created_at)
		);

	componentWillReceiveProps(nextProps) {
		this.setState({
			friendId: nextProps.friend.id,
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
			<Menu vertical id="chatbox">
				<h3>Chat with {this.props.friend.firstname}</h3>
				<Menu.Item id="msg-window">
					{this.sortedMessages().map(
						(m, i) =>
							m.sender_id === this.props.currentUserId ? (
								<Card raised className="msg self" key={i}>
									{m.content}
								</Card>
							) : (
								<Card raised key={i} className="msg received">
									{m.content}
								</Card>
							)
					)}
				</Menu.Item>
				<Form onSubmit={this.handleSubmit}>
					<Form.Input
						placeholder="Your message here..."
						rows={2}
						value={this.state.content}
						onChange={this.handleInputChange}
					/>
					<Button primary type="submit" id="chat-send-btn">
						Send
					</Button>
				</Form>
				<br />
				<a
					role="button"
					onClick={this.props.closeChat}
					style={{ cursor: 'pointer' }}
					id="close-chat-link">
					Close
				</a>
			</Menu>
		);
	}
}

const mapStateToProps = state => ({
	currentUserId: state.auth.currentUser.id
});

export default connect(mapStateToProps, { sendMessage })(ChatContainer);

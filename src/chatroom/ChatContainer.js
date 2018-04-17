import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/chatActions';

// NOTE: flip send/receieve

class ChatContainer extends Component {
	state = {
		friendId: this.props.friend.id,
		content: '',
		sentMessages: this.props.friend.received_messages,
		receivedMessages: this.props.friend.sent_messages
	};

	// componentDidMount() {
	// 	console.log(this.sortByDate(this.props.friend.sent_messages));
	// 	this.setState({
	// 		sentMessages: this.sortByDate(this.props.friend.sent_messages),
	// 		receivedMessages: this.sortByDate(this.props.friend.received_messages)
	// 	});
	// }

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
		console.log(this.state.friendId, this.state.content);
		this.props.sendMessage(this.state.friendId, this.state.content);
		this.setState({ content: '' });
	};

	render() {
		return (
			<div>
				<h3>Chat with {this.props.friend.firstname}</h3>
				<div>
					<h5>sent:</h5>
					<ol>
						{this.state.sentMessages.map((m, i) => (
							<li key={i}>{m.content}</li>
						))}
					</ol>
					<br />
					<h5>received: </h5>
					<ol>
						{this.state.receivedMessages.map((m, i) => (
							<li key={i}>{m.content}</li>
						))}
					</ol>
				</div>
				<form onSubmit={this.handleSubmit}>
					<input
						value={this.state.content}
						type="text"
						onChange={this.handleInputChange}
					/>
					<input type="submit" value="Send" />
				</form>
				<br />
				<button onClick={this.props.closeChat}>Close</button>
			</div>
		);
	}
}

export default connect(null, { sendMessage })(ChatContainer);

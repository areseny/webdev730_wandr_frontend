// import React, { Component } from 'react';
//
// export default class ChatForm extends Component {
// 	state = { id: this.props.friendId, content: '' };
//
// 	handleInputChange = e => {
// 		this.setState({ content: e.target.value });
// 	};
//
// 	sendMesssage = e => {
// 		e.preventDefault();
// 		const options = {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json',
// 				Authorization: localStorage.getItem('jwt')
// 			},
// 			body: JSON.stringify(this.state)
// 		};
// 		fetch(`https://wandr-backend.herokuapp.com/users/add_message`, options)
// 			.then(res => res.json())
// 			.then(json => {
// 				this.props.updateChatHistory(json.content);
// 			});
// 	};
//
// 	render() {
// 		return (
// 			<form onSubmit={this.sendMesssage}>
// 				<input type="text" onChange={this.handleInputChange} />
// 				<input type="submit" value="Send" />
// 			</form>
// 		);
// 	}
// }

import React, { Component } from 'react';

const ChatroomList = props => {
	return props.friends.map(f => (
		<button key={f.id} onClick={() => props.selectRoom(f.id)}>
			{f.firstname}
		</button>
	));
};

export default ChatroomList;

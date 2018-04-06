import React from 'react';

function withAuth(Component) {
	return class extends React.Component {
		render() {
			return this.props.loggedIn ? (
				<Component {...this.props} />
			) : (
				<h1>why is this always showing up</h1>
			);
		}
	};
}

export default withAuth;

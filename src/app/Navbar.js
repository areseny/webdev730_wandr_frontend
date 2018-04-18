import React from 'react';
import { NavLink } from 'react-router-dom';
import { logOut } from '../actions/authActions';
import { connect } from 'react-redux';
import { Menu, Button, Dropdown, Icon } from 'semantic-ui-react';

const Navbar = props => (
	<Menu className="secondary">
		<Menu.Menu position="right">
			<Dropdown text={props.currentUser.firstname}>
				<Dropdown.Menu>
					<Dropdown.Item as={NavLink} to="/home">
						Home
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item as={NavLink} to="/mytrips">
						My Trips
					</Dropdown.Item>
					<Dropdown.Item as={NavLink} to="/friends">
						Friends
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={() => props.logOut(props.history)}>
						Log Out
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Menu>
	</Menu>
);

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn,
	currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, { logOut })(Navbar);

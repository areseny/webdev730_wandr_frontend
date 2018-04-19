import React from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../actions/authActions';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'semantic-ui-react';

const Navbar = props => (
	<Menu className="secondary">
		<Menu.Item as={Link} to="/home" id="logo">
			WANDR
		</Menu.Item>
		<Menu.Menu position="right">
			<Dropdown icon={'user circle'}>
				<Dropdown.Menu>
					<Dropdown.Item as={Link} to="/mytrips">
						My Trips
					</Dropdown.Item>
					<Dropdown.Item as={Link} to="/friends">
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchUsers } from '../actions/friendActions';
import withAuth from '../app/withAuth';
import Navbar from '../app/Navbar';
import moment from 'moment';
import { Card, Grid, Message, Icon } from 'semantic-ui-react';
import '../stylesheets/trip.css';

class TripsList extends Component {
	state = { loaded: false };

	componentDidMount() {
		this.props.fetchUsers();
	}

	componentWillReceiveProps(nextProps) {
		if (Object.keys(nextProps.currentUser || {}).length) {
			this.setState({ loaded: true });
		}
	}

	upcomingTrips = () =>
		this.props.userTrips.length
			? this.props.userTrips.map(
					(ut, i) =>
						new Date(ut.startDate) > new Date() ? (
							<Card
								className="trip-list-card"
								fluid
								key={i}
								color="teal"
								as={Link}
								to={`/mytrips/${ut.id}`}
								header={ut.name}
								meta={`From ${moment(ut.startDate).format('LL')} to ${moment(
									ut.endDate
								).format('LL')}`}
								description={ut.description}
							/>
						) : null
			  )
			: null;

	pastTrips = () =>
		this.props.userTrips.length
			? this.props.userTrips.map(
					(ut, i) =>
						new Date(ut.startDate) < new Date() ? (
							<Card
								className="trip-list-card"
								fluid
								key={i}
								color="teal"
								as={Link}
								to={`/mytrips/${ut.id}`}
								header={ut.name}
								meta={`From ${moment(ut.startDate).format('LL')} to ${moment(
									ut.endDate
								).format('LL')}`}
								description={ut.description}
							/>
						) : null
			  )
			: null;

	friendsTrips = () => {
		if (this.props.friendsTrips.length) {
			let friendsTrips = this.props.friendsTrips.reduce(
				(acc, f) => acc.concat(f),
				[]
			);
			return friendsTrips.map((ft, i) => (
				<Card
					className="trip-list-card"
					fluid
					key={i}
					color="teal"
					as={Link}
					to={`/trips/${ft.id}`}
					header={ft.name}
					meta={`From ${moment(ft.startDate).format('LL')} to ${moment(
						ft.endDate
					).format('LL')}`}
					description={ft.description}
				/>
			));
		}
	};

	render() {
		return (
			<div id="trip-list">
				<Navbar history={this.props.history} />
				{this.state.loaded ? (
					<div className="main-container">
						<h1>Trips</h1>
						<Grid columns={3}>
							<Grid.Column>
								<h3>Upcoming Trips</h3>
								{this.upcomingTrips()}
							</Grid.Column>
							<Grid.Column>
								<h3>Past Trips</h3>
								{this.pastTrips()}
							</Grid.Column>
							<Grid.Column>
								<h3>{"Friends' Trips"}</h3>
								{this.friendsTrips()}
							</Grid.Column>
						</Grid>
						<br />
						<Link to="/addTrip">Add New Trip</Link>
					</div>
				) : (
					<Message icon>
						<Icon name="circle notched" color="teal" loading />
						<Message.Content>
							<Message.Header>Just one second</Message.Header>
							"We are loading your friends' info for you."
						</Message.Content>
					</Message>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userTrips: state.trip.userTrips,
	friendsTrips: state.trip.friendsTrips
});

export default withRouter(
	connect(mapStateToProps, { fetchUsers })(withAuth(TripsList))
);

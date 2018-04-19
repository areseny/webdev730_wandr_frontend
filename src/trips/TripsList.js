import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withAuth from '../app/withAuth';
import Navbar from '../app/Navbar';
import TripCard from './TripCard';
import AddTripForm from './AddTripForm';
import { Card, Button } from 'semantic-ui-react';
import '../stylesheets/trip.css';

class TripsList extends Component {
	state = { adding: false };

	toggleAdd = () => {
		this.setState({ adding: !this.state.adding });
	};

	render() {
		return (
			<div>
				<Navbar history={this.props.history} />
				<div className="main">
					<h1>My Trips</h1>
					{this.state.adding ? (
						<AddTripForm toggleAdd={this.toggleAdd} />
					) : (
						<Button className="float-right-btn" onClick={this.toggleAdd}>
							Add New Trip
						</Button>
					)}
					<Card.Group id="trips-list-cards">
						{this.props.userTrips.map((t, i) => <TripCard key={i} trip={t} />)}
					</Card.Group>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userTrips: state.trip.userTrips
});

export default withRouter(connect(mapStateToProps)(withAuth(TripsList)));

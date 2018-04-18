import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withAuth from '../app/withAuth';
import Navbar from '../app/Navbar';
import TripCard from './TripCard';
import AddTripForm from './AddTripForm';
import { Card } from 'semantic-ui-react';

class TripsList extends Component {
	state = { adding: false };

	toggleAdd = () => {
		this.setState({ adding: !this.state.adding });
	};

	render() {
		return (
			<div>
				<Navbar history={this.props.history} />
				<h1>My Trips</h1>

				<Card.Group>
					{this.props.userTrips.map((t, i) => <TripCard key={i} trip={t} />)}
				</Card.Group>

				{this.state.adding ? (
					<AddTripForm toggleAdd={this.toggleAdd} />
				) : (
					<button onClick={this.toggleAdd}>Add New Trip</button>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userTrips: state.trip.userTrips
});

export default withRouter(connect(mapStateToProps)(withAuth(TripsList)));

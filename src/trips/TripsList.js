import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withAuth from '../app/withAuth';
import TripCard from './TripCard';
import AddTripForm from './AddTripForm';

class TripsList extends Component {
	state = { adding: false };

	toggleAdd = () => {
		this.setState({ adding: !this.state.adding });
	};

	render() {
		return (
			<div>
				<h1>My Trips</h1>
				<ul>
					{this.props.userTrips.map((t, i) => (
						<li key={i}>
							<TripCard trip={t} />
						</li>
					))}
				</ul>
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

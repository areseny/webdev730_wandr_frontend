import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchTrip, deleteTrip } from '../actions/tripActions';
import withAuth from '../app/withAuth';
import TripContent from './TripContent';
import EditTripForm from './EditTripForm';

class TripPage extends Component {
	state = { editing: false };

	componentDidMount() {
		this.props.fetchTrip(this.props.match.params.id);
	}

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	displayEditSection = () =>
		this.state.editing ? (
			<div>
				<EditTripForm trip={this.props.trip} toggleEdit={this.toggleEdit} />
			</div>
		) : (
			<button onClick={this.toggleEdit}>Edit Trip</button>
		);

	handleDelete = () => {
		this.props.deleteTrip(this.props.match.params.id, this.props.history);
	};

	render() {
		return (
			<div>
				<h1>{this.props.trip.name}</h1>
				<TripContent trip={this.props.trip} />
				<br />
				{this.displayEditSection()}
				<button onClick={this.handleDelete}>Delete Trip</button>
				<br />
				<br />
				<Link to="/trips">Back</Link>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	trip: state.trip.trip
});

export default withRouter(
	connect(mapStateToProps, { fetchTrip, deleteTrip })(withAuth(TripPage))
);

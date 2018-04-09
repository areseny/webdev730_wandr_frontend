import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUserTrip } from '../actions/tripActions';
import withAuth from '../app/withAuth';
import TripContent from './TripContent';
import EditTripForm from './EditTripForm';

class TripPage extends Component {
	state = { editing: false };

	componentDidMount() {
		this.props.fetchUserTrip(this.props.match.params.id);
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

	render() {
		return (
			<div>
				<h1>{this.props.trip.name}</h1>
				<TripContent trip={this.props.trip} />
				<br />
				{this.displayEditSection()}
				<button>Delete Trip</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	trip: state.trip.userTrip
});

export default withRouter(
	connect(mapStateToProps, { fetchUserTrip })(withAuth(TripPage))
);

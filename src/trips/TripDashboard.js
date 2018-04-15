import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTrip } from '../actions/tripActions';
import TripContent from './TripContent';
import EditTripForm from './EditTripForm';

import DestinationsContainer from '../destinations/DestinationsContainer';

class TripDashboard extends Component {
	state = { editing: false };

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	handleDelete = () => {
		this.props.deleteTrip(this.props.targetTrip.id, this.props.history);
	};

	render() {
		return (
			<div>
				<h1>{this.props.targetTrip.name}</h1>
				<div>
					{this.state.editing ? (
						<EditTripForm
							targetTrip={this.props.targetTrip}
							toggleEdit={this.toggleEdit}
						/>
					) : (
						<TripContent
							targetTrip={this.props.targetTrip}
							toggleEdit={this.toggleEdit}
						/>
					)}
				</div>
				<br />
				<DestinationsContainer
					destinations={this.props.targetTrip.destinations}
				/>
				<button onClick={this.handleDelete}>Delete Trip</button>
			</div>
		);
	}
}

export default connect(null, { deleteTrip })(TripDashboard);

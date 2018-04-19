import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTrip } from '../actions/tripActions';
import TripContent from './TripContent';
import EditTripForm from './EditTripForm';
import DestinationsContainer from '../destinations/DestinationsContainer';
import { Button } from 'semantic-ui-react';

class TripDashboard extends Component {
	state = { editing: false };

	toggleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	handleDelete = () => {
		if (
			window.confirm('This action cannot be undone. Would you like to proceed?')
		) {
			this.props.deleteTrip(this.props.targetTrip.id, this.props.history);
		}
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
						<div>
							<TripContent
								targetTrip={this.props.targetTrip}
								toggleEdit={this.toggleEdit}
							/>
							<button onClick={this.toggleEdit}>Edit Trip</button>
						</div>
					)}
				</div>
				<br />
				<DestinationsContainer
					destinations={this.props.targetTrip.destinations}
				/>
				<br />
				<Button
					basic
					color="red"
					onClick={this.handleDelete}
					className="float-right-btn">
					Delete Trip
				</Button>
			</div>
		);
	}
}

export default connect(null, { deleteTrip })(TripDashboard);

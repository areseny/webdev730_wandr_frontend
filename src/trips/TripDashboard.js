import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTrip } from '../actions/tripActions';
import TripContent from './TripContent';
import EditTripForm from './EditTripForm';

class TripDashboard extends Component {
	state = { editing: false };

	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.targetTrip) {
	// 		this.setState({ loaded: true });
	// 	}
	// }

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
				<TripContent targetTrip={this.props.targetTrip} />
				<br />
				{this.state.editing ? (
					<div>
						<EditTripForm
							targetTrip={this.props.targetTrip}
							toggleEdit={this.toggleEdit}
						/>
					</div>
				) : (
					<button onClick={this.toggleEdit}>Edit Trip</button>
				)}
				<button onClick={this.handleDelete}>Delete Trip</button>
			</div>
		);
	}
}

// const mapStateToProps = state => ({
// 	tartgetTrip: state.trip.targetTrip
// });

export default connect(null, { deleteTrip })(TripDashboard);

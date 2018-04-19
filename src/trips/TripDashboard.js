import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTrip } from '../actions/tripActions';
import TripContent from './TripContent';
import EditTripForm from './EditTripForm';
import DestinationsContainer from '../destinations/DestinationsContainer';
import { Button, Icon, Container } from 'semantic-ui-react';

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
			<Container>
				<h1>{this.props.targetTrip.name}</h1>
				<div>
					{this.state.editing ? (
						<div>
							<EditTripForm
								targetTrip={this.props.targetTrip}
								toggleEdit={this.toggleEdit}
							/>
							<Button
								basic
								color="red"
								onClick={this.handleDelete}
								className="float-right-btn">
								Delete Trip
							</Button>
						</div>
					) : (
						<div>
							<TripContent
								targetTrip={this.props.targetTrip}
								toggleEdit={this.toggleEdit}
							/>
							<a
								role="button"
								onClick={this.toggleEdit}
								style={{ cursor: 'pointer', color: '#fe8181' }}>
								<Icon name="edit" />
							</a>
							<DestinationsContainer
								destinations={this.props.targetTrip.destinations}
							/>
						</div>
					)}
				</div>
			</Container>
		);
	}
}

export default connect(null, { deleteTrip })(TripDashboard);

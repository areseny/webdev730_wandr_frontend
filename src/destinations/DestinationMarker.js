import React, { Component } from 'react';
import DestinationInfoWindow from './DestinationInfoWindow';
import { Marker, InfoWindow } from 'react-google-maps';
import destinationIcon from '../media/destination.png';
import { connect } from 'react-redux';
import { updateTargetDestination } from '../actions/destActions';

class DestinationMarker extends Component {
	state = { hover: false };

	handleClick = () => {
		this.props.updateTargetDestination(this.props.destination);
	};

	handleMouseOver = () => {
		this.setState({ hover: true });
	};

	handleMouseOut = () => {
		this.setState({ hover: false });
	};

	render() {
		return (
			<Marker
				icon={destinationIcon}
				position={{
					lat: Number(this.props.destination.lat),
					lng: Number(this.props.destination.lng)
				}}
				onClick={this.handleClick}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}>
				{this.state.hover ? (
					<InfoWindow>
						<DestinationInfoWindow name={this.props.destination.name} />
					</InfoWindow>
				) : null}
			</Marker>
		);
	}
}

export default connect(null, { updateTargetDestination })(DestinationMarker);

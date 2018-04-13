import React, { Component } from 'react';
import DestinationInfoWindow from './DestinationInfoWindow';
import { Marker, InfoWindow } from 'react-google-maps';
import { connect } from 'react-redux';
import { updateTargetDestination } from '../actions/mapActions';
// import closedEnvelope from '../media/closedEnv.png';
// import openEnvelope from '../media/openEnv.png';
// import '../stylesheets/map.css';

class DestinationMarker extends Component {
	state = { hover: false };

	handleClick = () => {
		this.props.updateTargetDestination(this.props.destination);
	};

	handleMouseOver = () => {
		this.setState({ hover: true });
		console.log('HOVERING');
		// add info window here
	};

	handleMouseOut = () => {
		this.setState({ hover: false });
	};

	render() {
		return (
			<Marker
				position={{
					lat: Number(this.props.destination.lat),
					lng: Number(this.props.destination.lng)
				}}
				onClick={this.handleClick}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}>
				{this.state.hover ? (
					<InfoWindow>
						<DestinationInfoWindow destination={this.props.destination} />
					</InfoWindow>
				) : null}
			</Marker>
		);
	}
}

export default connect(null, { updateTargetDestination })(DestinationMarker);

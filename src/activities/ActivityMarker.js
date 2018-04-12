import React, { Component } from 'react';
import ActivityCardLite from './ActivityCardLite';
import { Marker, InfoWindow } from 'react-google-maps';
import { connect } from 'react-redux';
import { updateTargetActivity } from '../actions/mapActions';
// import closedEnvelope from '../media/closedEnv.png';
// import openEnvelope from '../media/openEnv.png';
// import '../stylesheets/map.css';

class ActivityMarker extends Component {
	state = { hover: false };

	handleClick = () => {
		this.props.updateTargetActivity(this.props.activity);
	};

	handleMouseOver = () => {
		this.setState({ hover: true });
		console.log('HOVERING');
		// add info window
	};

	handleMouseOut = () => {
		this.setState({ hover: false });
	};

	render() {
		return (
			<Marker
				position={{
					lat: Number(this.props.activity.lat),
					lng: Number(this.props.activity.lng)
				}}
				onClick={this.handleClick}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}>
				{this.state.hover ? (
					<InfoWindow>
						<ActivityCardLite activity={this.props.activity} />
					</InfoWindow>
				) : null}
			</Marker>
		);
	}
}

export default connect(null, { updateTargetActivity })(ActivityMarker);

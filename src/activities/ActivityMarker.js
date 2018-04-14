import React, { Component } from 'react';
import ActivityInfoWindow from './ActivityInfoWindow';
import { Marker, InfoWindow } from 'react-google-maps';
// import { connect } from 'react-redux';
// import { updateTargetActivity } from '../actions/mapActions';
import activityIcon from '../media/activity.png';

export default class ActivityMarker extends Component {
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
				icon={activityIcon}
				position={{
					lat: Number(this.props.activity.lat),
					lng: Number(this.props.activity.lng)
				}}
				onClick={this.handleClick}
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}>
				{this.state.hover ? (
					<InfoWindow>
						<ActivityInfoWindow
							name={this.props.activity.name}
							description={this.props.activity.description}
						/>
					</InfoWindow>
				) : null}
			</Marker>
		);
	}
}

// export default connect(null, { updateTargetActivity })(ActivityMarker);

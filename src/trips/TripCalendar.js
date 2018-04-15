import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTargetDestination } from '../actions/destActions';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends Component {
	state = { events: [] };

	componentDidMount() {
		const activityEvents = this.props.activities.map(a => ({
			id: a.id,
			title: a.name,
			start: new Date(a.startTime),
			end: new Date(a.endTime),
			type: 'activity'
		}));
		const tripEvents = {
			id: this.props.trip.id,
			title: this.props.trip.name.toUpperCase(),
			allDay: true,
			start: new Date(this.props.trip.startDate),
			end: new Date(this.props.trip.endDate),
			type: 'trip'
		};
		const destinationEvents = this.props.trip.destinations.map(d => ({
			id: d.id,
			title: d.name,
			start: new Date(d.arrival),
			end: new Date(d.departure),
			type: 'destination'
		}));
		const allEvents = activityEvents
			.concat(tripEvents)
			.concat(destinationEvents);
		this.setState({ events: allEvents });
	}

	moveEvent = ({ e, start, end }) => {
		if (e.type === 'destination') {
			const i = this.state.events.indexOf(e);
			const updatedEvent = { ...e, start, end };

			// update state and persist

			const updatedEvents = [...this.state.events];
			updatedEvents.splice(i, 1, updatedEvent);
			this.setState({
				events: updatedEvents
			});
		} else {
			alert('Can only change destination times via the calendar.');
		}
	};

	eventStyleGetter = (event, start, end, isSelected) => {
		let customStyle = {
			borderRadius: '0.5rem',
			opacity: 0.8,
			color: 'black',
			display: 'block'
		};
		if (event.type === 'destination') {
			customStyle.backgroundColor = 'red';
		} else if (event.type === 'activity') {
			customStyle.backgroundColor = 'transparent';
			customStyle.color = 'pink';
		}
		return { style: customStyle };
	};

	render() {
		return (
			<DragAndDropCalendar
				selectable
				popup
				events={this.state.events}
				onEventDrop={this.moveEvent}
				defaultView="month"
				defaultDate={new Date(this.props.trip.startDate)}
				onSelectEvent={e => {
					if (e.type === 'destination') {
						this.props.setTargetDestination(e.id);
					}
				}}
				eventPropGetter={this.eventStyleGetter}
			/>
		);
	}
}

export default connect(null, { setTargetDestination })(
	DragDropContext(HTML5Backend)(Dnd)
);

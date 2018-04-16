import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTargetDestination } from '../actions/destActions';
import { editTrip } from '../actions/tripActions';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends Component {
	state = { allEvents: [] };

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
		this.setState({
			allEvents: [...activityEvents, tripEvents, ...destinationEvents]
		});
	}

	moveEvent = ({ event, start, end }) => {
		if (event.type === 'destination') {
			const i = this.state.allEvents.indexOf(event);
			const updatedEvent = { ...event, start, end };
			const updatedEvents = [...this.state.allEvents];
			updatedEvents.splice(i, 1, updatedEvent);
			this.setState({ allEvents: updatedEvents });

			const j = this.props.trip.destinations.findIndex(d => d.id === event.id);
			const updatedDestination = {
				...this.props.trip.destinations[j],
				arrival: start,
				departure: end
			};
			const updatedTrip = { ...this.props.trip };
			updatedTrip.destinations.splice(j, 1, updatedDestination);
			this.props.editTrip(updatedTrip);
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
				events={this.state.allEvents}
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

export default connect(null, { setTargetDestination, editTrip })(
	DragDropContext(HTML5Backend)(Dnd)
);

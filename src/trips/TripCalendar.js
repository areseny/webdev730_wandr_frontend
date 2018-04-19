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
import '../stylesheets/trip.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends Component {
	state = { allEvents: [] };

	componentDidMount() {
		this.generateAllEvents(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.generateAllEvents(nextProps);
	}

	generateAllEvents = props => {
		const tripEvents = {
			id: props.trip.id,
			title: props.trip.name.toUpperCase(),
			allDay: true,
			start: new Date(props.trip.startDate + 'T12:00:00'),
			end: new Date(props.trip.endDate + 'T12:00:00'),
			type: 'trip'
		};
		const destinationEvents = props.trip.destinations.map(d => {
			return {
				id: d.id,
				title: d.name,
				start: new Date(d.arrival + 'T12:00:00'),
				end: new Date(d.departure + 'T12:00:00'),
				type: 'destination'
			};
		});
		const activityEventsNested = props.trip.destinations.map(d =>
			d.activities.map(a => ({
				id: a.id,
				title: a.name,
				start: a.startTime,
				end: a.endTime,
				type: 'activity'
			}))
		);
		const activityEvents = activityEventsNested.reduce(
			(arr, act) => arr.concat(act),
			[]
		);
		this.setState({
			allEvents: [tripEvents, ...destinationEvents, ...activityEvents]
		});
	};

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
			display: 'block',
			backgroundColor: '#0fc0ad'
		};
		if (event.type === 'destination') {
			customStyle.backgroundColor = '#fe8181';
		} else if (event.type === 'activity') {
			customStyle.backgroundColor = 'transparent';
			customStyle.color = 'black';
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

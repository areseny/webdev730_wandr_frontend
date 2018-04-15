import React from 'react';
import { connect } from 'react-redux';
import { setTargetDestination } from '../actions/destActions';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const TripCalendar = props => {
	const activityEvents = props.activities.map(a => ({
		id: a.id,
		title: a.name,
		start: new Date(a.startTime),
		end: new Date(a.endTime),
		type: 'activity'
	}));

	const tripEvents = {
		id: props.trip.id,
		title: props.trip.name.toUpperCase(),
		allDay: true,
		start: new Date(props.trip.startDate),
		end: new Date(props.trip.endDate),
		type: 'trip'
	};

	const destinationEvents = props.trip.destinations.map(d => ({
		id: d.id,
		title: d.name,
		start: new Date(d.arrival),
		end: new Date(d.departure),
		type: 'destination'
	}));

	const allEvents = activityEvents.concat(tripEvents).concat(destinationEvents);

	// const calEvents = activityTimes.concat(tripTimes);

	const eventStyleGetter = (event, start, end, isSelected) => {
		let customStyle = {
			borderRadius: '10px',
			opacity: 0.8,
			color: 'black',
			border: '0px',
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

	return (
		<BigCalendar
			selectable
			popup
			events={allEvents}
			defaultView="month"
			defaultDate={new Date(props.trip.startDate)}
			showMultiDayTimes
			onSelectEvent={e => {
				props.setTargetDestination(e.id);
			}}
			eventPropGetter={eventStyleGetter}
		/>
	);
};

export default connect(null, { setTargetDestination })(TripCalendar);

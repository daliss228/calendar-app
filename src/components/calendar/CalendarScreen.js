import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import { Navbar } from '../ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { messages } from '../../helpers/calendar-messages';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActive, eventStarLoaded } from '../../actions/calendar';
import { AddNewFAB } from '../ui/AddNewFAB';
import { DeletedEventFAB } from '../ui/DeletedEventFAB';

moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const {events, activeEvent} = useSelector(state => state.calendar);

    const {uid} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {
        dispatch(eventStarLoaded());
    }, [dispatch])

    const onDoubleClick = (e) => {
        // console.log('onDoubleClick');
        // console.log(e);
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        // console.log('onSelectEvent');
        console.log(e);
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        // console.log('onViewChange');
        // console.log(e);
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: (uid === event.user._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    const onSelectSlot = () => {
        dispatch(eventClearActive());
    }

    return (
        <div className="calendar-screen">
            <Navbar></Navbar>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                view={lastView}
                onSelectSlot={onSelectSlot}
                selectable={true}
            />
            <AddNewFAB></AddNewFAB>
            { activeEvent && <DeletedEventFAB></DeletedEventFAB>}
            <CalendarModal></CalendarModal>
        </div>
    )
}


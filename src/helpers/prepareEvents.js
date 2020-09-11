import moment from 'moment';

export const prepareEvents = (events) => {
    return events.map(
        (events) => ({
            ...events,
            start: moment(events.start).toDate(),
            end: moment(events.end).toDate()
        })
    );   
}
import { types } from "../types/types";

// {
//     id: 'sadadadadadad',
//     title: 'Carnaval',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123456',
//         name: 'Juan'
//     }
// }

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive: 
            return {
                ...state,
                activeEvent: action.payload
            };
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }
        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null
            }
        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(event => 
                    (event.id === action.payload.id)
                    ? action.payload
                    : event
                )
            }
        case types.eventDelete:
            return {
                ...state,
                activeEvent: null,
                events: state.events.filter(event => 
                    (event.id !== state.activeEvent.id)
                )
            }
        case types.eventLoad:
            return {
                ...state,
                events: [...action.payload]
            }
        case types.eventLogout:
            return {...initialState};
        default:
            return state;
    }

}
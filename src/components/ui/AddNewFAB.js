import React from 'react';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch } from 'react-redux';

export const AddNewFAB = () => {

    const dispatch = useDispatch();

    const newCalendar = () => {
        dispatch(uiOpenModal());
    }

    return (
        <button className="btn btn-primary fab" onClick={newCalendar}>
            <i className="fas fa-plus"></i>
        </button>
    )
}

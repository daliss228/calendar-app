import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { logoutClean } from '../../actions/calendar';

export const Navbar = () => {

    const dispatch = useDispatch();

    const {name} = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(logoutClean());
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>
            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt" onClick={handleLogout}></i>
                <span> Salir</span>
            </button>
        </div>
    )
}

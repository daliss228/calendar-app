import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRoute = () => {

    const {checking, uid} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    // if (checking) {
    //     return <h1>Espere...</h1>
    // }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact path="/login"
                        component={LoginScreen}
                        isAuthenticated={!!uid}>
                    </PublicRoute>
                    <PrivateRoute
                        exact path="/"
                        component={CalendarScreen}
                        isAuthenticated={!!uid}
                        >
                    </PrivateRoute>
                    
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}
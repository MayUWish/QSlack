import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import {useHistory } from 'react-router-dom';

const DemoButton = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const demoUser = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));
        // once logged-in by using DemoUser, launch the app by going to the following page
        history.push(`/clients/demo`)

    };

    return (
        <button onClick={demoUser}>Try A Demo</button>)
};

export default DemoButton;
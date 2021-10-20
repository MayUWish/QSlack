import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';

const DemoButton = () => {
    const dispatch = useDispatch()

    const demoUser = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));

    };

    return (
        <button onClick={demoUser}>Try A Demo</button>)
};

export default DemoButton;
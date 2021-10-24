import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import {useHistory } from 'react-router-dom';
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk} from "../../store/dmChannels";

const DemoButton = ({ info }) => {
    const dispatch = useDispatch()
    const history = useHistory();
    const demoUser = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));
        await dispatch(getChatGroupsThunk())
        await dispatch(getDMChannelsThunk())
        // once logged-in by using DemoUser, launch the app by going to the following page
        history.push(`/clients/demo`)

    };

    return (
        <button className='btn' onClick={demoUser} 
            style={{ color: 'white', backgroundColor:'#183a1d', width:'150px'}}>
                {info}
        </button>)
};

export default DemoButton;
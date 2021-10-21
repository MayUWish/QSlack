import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk } from "../../store/dmChannels";

import './LeftBar.css';

function LeftBar() {
    const dispatch = useDispatch();
    // const [dmChannel, setDmChannel] = useState({});
    // const [chatGroups, setChatGroups] = useState({}); 
    const [showChatGroups, setShowChatGroups] = useState(true);
    const [showDM, setShowDM] = useState(true);
    const [showMoments, setShowMoments] = useState(true);
    const currentUser = useSelector((state) => state.session?.user);
    const chatGroups = useSelector((state) => state.chatGroups);
    const dmChannels = useSelector((state) => state.dmChannels);
    const userId = currentUser.id

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            await dispatch(getChatGroupsThunk())
            await dispatch(getDMChannelsThunk())
            // const response = await fetch(`/api/groups/`);
            // const groups = await response.json();
            // console.log('groups!!', groups)
            // setDmChannel(groups.dmChannel);
            // setChatGroups(groups.chatGroups);
          
        })();
    }, [dispatch, userId]);

    const loadGroupChats = (e) =>{

    }

    if (!userId) {
        return null;
    }

    return (
        <div className='leftBarWrapper'>
            <h3 style={{ display: 'inline' }}>Cheerful welcome, {currentUser.username}</h3>
            <div className='groupsWrapper'>
                <i className={showChatGroups ? "fas fa-caret-down" : "fas fa-caret-right"} onClick={e => setShowChatGroups(showChatGroups=>!showChatGroups)}/> <h4 style={{display:'inline'}}>Group chats</h4>
                {showChatGroups && Object.keys(chatGroups).map((groupId, i) =>
                    <div className='groupEl' key={`chatGroups${i}`} onClick={loadGroupChats}><i className="fas fa-envelope" /> {chatGroups[groupId]?.name}</div>
                )}
                
            </div>
            <div className='groupsWrapper'>
                <i className={showDM ? "fas fa-caret-down" : "fas fa-caret-right"} onClick={e => setShowDM(showDM=>!showDM)} /> <h4 style={{ display: 'inline' }}>Direct messages</h4>
                {showDM && Object.keys(dmChannels).map((groupId, i) =>
                    <div className='groupEl' key={`dmChannel${i}`}><i className="fas fa-comment" />
                    {/* dmChannel is array of dictionary, members of which is dictionary; dmChannel will only have 2 members, currentUser vs the other user whose name is displayed */}
                     {dmChannels[groupId]?.members[(Object.keys(dmChannels[groupId]?.members).filter(memberId => +memberId !== +currentUser.id)[0])].username}</div>
                )}
                
            </div>
            <div className='groupsWrapper'>
                <i className={showMoments ? "fas fa-caret-down" : "fas fa-caret-right"} onClick={e => setShowMoments(showMoments => !showMoments)} /> <h4 style={{ display: 'inline' }}>Moments</h4>
            </div>
                   
        </div>
    );
}
export default LeftBar;
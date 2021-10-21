import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk } from "../../store/dmChannels";
import MainContent from '../MainContent/MainContent';
import CreateGroupFormModal from '../CreateGroupModal';
import './LeftBar.css';

function LeftBar() {
    const dispatch = useDispatch();
    const [showChatGroups, setShowChatGroups] = useState(true);
    const [showDM, setShowDM] = useState(true);
    const [showMoments, setShowMoments] = useState(true);
    const [groupId, setGroupId] = useState(null);

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
          
        })();
    }, [dispatch, userId]);

    const loadGroupChats = (e) =>{
        setGroupId(e.target.value)
        // console.log('???? !!!!!!', e.target.value)

    }

    if (!userId) {
        return null;
    }

    return (
        <div className='Wrapper'>
            <div className='leftBarWrapper'>
                <h3 style={{ display: 'inline' }}>Cheerful welcome, {currentUser.username}</h3>
                <div className='groupsWrapper'>
                    <i className={showChatGroups ? "fas fa-caret-down" : "fas fa-caret-right"} onClick={e   => setShowChatGroups(showChatGroups=>!showChatGroups)}/> 
                    <h4 style={{display:'inline'}}>Group chats</h4>
                    {/* <i className="fas fa-plus" style={{ marginLeft: '10%' }}/> */}
                    <CreateGroupFormModal />
                    {showChatGroups && Object.keys(chatGroups).map((groupId, i) =>
                        <button className='groupEl' key={`chatGroups${i}`} value={groupId} onClick={loadGroupChats}><i className="fas fa-envelope" /> {chatGroups[groupId]?.name}</button>
                    )}

                </div>
                <div className='groupsWrapper'>
                    <i className={showDM ? "fas fa-caret-down" : "fas fa-caret-right"} onClick={e =>    setShowDM(showDM=>!showDM)} /> 
                    <h4 style={{ display: 'inline' }}>Direct messages</h4>
                    <i className="fas fa-plus" style={{ marginLeft: '10%' }} />
                    {showDM && Object.keys(dmChannels).map((groupId, i) =>
                        <button className='groupEl' key={`dmChannel${i}`} value={groupId} onClick={loadGroupChats}><i className="fas fa-comment" style={{ marginRight:'5px' }}/>
                        {/* dmChannel is array of dictionary, members of which is dictionary; dmChannel     will only have 2 members, currentUser vs the other user whose name is displayed */}
                            {dmChannels[groupId]?.members[(Object.keys(dmChannels[groupId]?.members).filter(memberId => +memberId !== +currentUser.id)[0])].username}</button>
                    )}

                </div>
                <div className='groupsWrapper'>
                    <i className={showMoments ? "fas fa-caret-down" : "fas fa-caret-right"} onClick={e =>   setShowMoments(showMoments => !showMoments)} /> <h4 style={{ display: 'inline'}} >Moments</h4>
                </div>
                    
            </div>
            <div className='mainContentWrapper'>
                {groupId && <MainContent groupId={groupId} />}
            </div>
            
        </div>
    );
}
export default LeftBar;
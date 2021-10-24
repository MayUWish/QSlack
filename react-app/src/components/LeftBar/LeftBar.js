import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk, removeDMChannelsThunk } from "../../store/dmChannels";
import MainContent from '../MainContentChatGroups/MainContent';
import MainContentDM from '../MainContentDM/MainContentDM';
import CreateGroupFormModal from '../CreateGroupModal';
import CreateDMFormModal from '../CreateDMModal';
import defaultProfilePic from '../../static/images/defaultProfilePic.png'
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

    const loadMain = (e) =>{
        setGroupId(e.target.value)
        // console.log('???? !!!!!!', e.target.value)

    }

    const removeFromStore = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        // button will need to have innerHTML to have e.target.value(e.g. close), otherwise undefined
        const id = e.target.value.split('_')[1]
        await dispatch(removeDMChannelsThunk(id))
    }

    if (!userId) {
        return null;
    }

    return (
        <div className='Wrapper'>
            <div className='leftBarWrapper'>
                <h3 style={{ borderBottom:'1px solid #183a1d', paddingBottom:'2%'}}>Cheerful welcome, {currentUser.username}</h3>
                <div className='groupsWrapper'>
                    <i className={showChatGroups ? "fas fa-caret-down" : "fas fa-caret-right"} onClick={e=> setShowChatGroups(showChatGroups=>!showChatGroups)}/> 
                    <h4 style={{ display:'inline', marginLeft:'1%' }} onClick={e => setShowChatGroups(showChatGroups => !showChatGroups)}>Group chats</h4>
                    <CreateGroupFormModal />
                    {showChatGroups && Object.keys(chatGroups).map((groupId, i) =>
                        <button className='groupEl' key={`chatGroups${i}`} value={`ChatGroups_${groupId}`} onClick={loadMain}># {chatGroups[groupId]?.name}</button>
                    )}

                </div>
                <div className='groupsWrapper'>
                    <i className={showDM ? "fas fa-caret-down" : "fas fa-caret-right"} onClick={e => setShowDM(showDM=>!showDM)} /> 
                    <h4 style={{ display: 'inline', marginLeft: '1%' }} onClick={e => setShowDM(showDM => !showDM)}>Direct messages</h4>
                    {/* setGroupId is passed down and used to load the mainContent when DM is already at db but user try to create one more */} 
                    <CreateDMFormModal setGroupId={setGroupId}/>
                    {showDM && Object.keys(dmChannels).map((groupId, i) =>
                        <div key={`dmChannelWrapper${i}`} style={{ display: 'flex', justifyContent:'space-between' }}>
                            <button className='groupEl' key={`dmChannelUserName${i}`} value={`DM_${groupId}`} onClick={loadMain} style={{ display: 'inline' }}>
                            {/* dmChannel is array of dictionary, members of which is dictionary; dmChannel     will only have 2 members, currentUser vs the other user whose name is displayed */}
                                <img src={dmChannels[groupId]?.members[(Object.keys(dmChannels[groupId]?.members).filter(memberId => +memberId !== +currentUser.id)[0])].profilePic ? dmChannels[groupId]?.members[(Object.keys(dmChannels[groupId]?.members).filter(memberId => +memberId !== +currentUser.id)[0])].profilePic : defaultProfilePic} alt='profilePicForDMChannel'
                                style={{width:'36px', height:'36px',borderRadius:'5px', marginRight:'3px'}}/>

                                {dmChannels[groupId]?.members[(Object.keys(dmChannels[groupId]?.members).filter(memberId => +memberId !== +currentUser.id)[0])].username}
                            </button>
                            <div style={{ display: 'flex', justifyContent: 'center',     flexDirection:'column' }}>
                                <button className='groupEl' key={`dmChannelRemoveButton${i}`} value={`DM_${groupId}`} onClick={removeFromStore} >
                                    close
                                </button>
                            </div>
                        </div>
                    )}

                </div>
                <div className='groupsWrapper'>
                    <i className={showMoments ? "fas fa-caret-down" : "fas fa-caret-right"} onClick={e =>   setShowMoments(showMoments => !showMoments)} /> <h4 style={{ display: 'inline'}} >Moments</h4>
                </div>
                    
            </div>
            <div className='mainContentWrapper'>
                {groupId && groupId.startsWith('ChatGroups_') && <MainContent groupId={groupId.split('_')[1]} />}
                {groupId && groupId.startsWith('DM_') && <MainContentDM groupId={groupId.split('_')[1]} />}
            </div>
            
        </div>
    );
}
export default LeftBar;
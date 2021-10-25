import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk, removeDMChannelsThunk } from "../../store/dmChannels";
import { getMomentsThunk } from "../../store/moments";
import MainContent from '../MainContentChatGroups/MainContent';
import MainContentDM from '../MainContentDM/MainContentDM';
import AllMoments from '../AllMoments'; 
import MyMoments from '../MyMoments';
import CreateGroupFormModal from '../CreateGroupModal';
import CreateDMFormModal from '../CreateDMModal';
import CreateMomentFormModal from '../CreateMomentModal';
import defaultProfilePic from '../../static/images/defaultProfilePic.png'
// import footer from '../../static/images/footer.png'
import './LeftBar.css';

function LeftBar() {
    const currentUser = useSelector((state) => state.session?.user);
    const chatGroups = useSelector((state) => state.chatGroups);
    const dmChannels = useSelector((state) => state.dmChannels);
    const userId = currentUser.id

    const dispatch = useDispatch();
    const [showChatGroups, setShowChatGroups] = useState(true);
    const [showDM, setShowDM] = useState(true);
    const [showMoments, setShowMoments] = useState(true);
    const [showAllMoments, setShowAllMoments] = useState(false);
    const [showMyMoments, setShowMyMoments] = useState(false);
    const [groupId, setGroupId] = useState(`ChatGroups_${ Object.keys(chatGroups)[0]}`);
    

    

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            await dispatch(getChatGroupsThunk())
            await dispatch(getDMChannelsThunk())
            await dispatch(getMomentsThunk())
            
          
        })();
    }, [dispatch, userId]);

    const loadMain = (e) =>{
        setGroupId(e.target.value);
        setShowAllMoments(false)
        setShowMyMoments(false)

        // onClick remove highlight class to all elements in groupsWapper and add highlight class to the target
        
        const dmParentEl = document.getElementsByClassName("groupsWrapper")[0].querySelectorAll(".highlight");;
        const chatGroupsParentEl = document.getElementsByClassName("groupsWrapper")[1].querySelectorAll(".highlight");
        const momentParentEl = document.getElementsByClassName("groupsWrapper")[2].querySelectorAll(".highlight");
        dmParentEl.forEach(e => e.classList.remove("highlight"));
        chatGroupsParentEl.forEach(e => e.classList.remove("highlight"));
        momentParentEl.forEach(e => e.classList.remove("highlight"));

        e.target.classList.add('highlight');
    }

    const loadMoment = (e) => {

        setShowMoments(showMoments => !showMoments)

    }
    const loadAllMoment = (e) =>{
        e.stopPropagation();
        setShowAllMoments(true)
        setShowMyMoments(false)
        setGroupId(null);

        const dmParentEl = document.getElementsByClassName("groupsWrapper")[0].querySelectorAll(".highlight");
        const chatGroupsParentEl = document.getElementsByClassName("groupsWrapper")[1].querySelectorAll(".highlight");
        const momentParentEl = document.getElementsByClassName("groupsWrapper")[2].querySelectorAll(".highlight");
        dmParentEl.forEach(e => e.classList.remove("highlight"));
        chatGroupsParentEl.forEach(e => e.classList.remove("highlight"));
        momentParentEl.forEach(e => e.classList.remove("highlight"));

        e.target.classList.add('highlight');
    }

    const loadMyMoment = (e) => {
        e.stopPropagation();
        setShowMyMoments(true)
        setShowAllMoments(false)
        setGroupId(null);

        const dmParentEl = document.getElementsByClassName("groupsWrapper")[0].querySelectorAll(".highlight");
        const chatGroupsParentEl = document.getElementsByClassName("groupsWrapper")[1].querySelectorAll(".highlight");
        const momentParentEl = document.getElementsByClassName("groupsWrapper")[2].querySelectorAll(".highlight");
        dmParentEl.forEach(e => e.classList.remove("highlight"));
        chatGroupsParentEl.forEach(e => e.classList.remove("highlight"));
        momentParentEl.forEach(e => e.classList.remove("highlight"));

        e.target.classList.add('highlight');
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
        <>
        <div className='Wrapper'>
            <div className='leftBarWrapper'>
                    <h3 style={{ borderBottom: '1px solid #183a1d', paddingBlock:'2%'}}>Cheerful welcome, {currentUser.username}</h3>
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
                    <div className='groupsWrapper' onClick={loadMoment}>
                        <div>
                            <i className={showMoments ? "fas fa-caret-down" : "fas fa-caret-right"}/> 
                            <h4 style={{ display: 'inline' }}>Moments</h4>
                        </div>

                        <CreateMomentFormModal setShowMyMoments={setShowMyMoments} setShowAllMoments={setShowAllMoments} setGroupId={setGroupId}/>

                        {showMoments && <div style={{ marginLeft:'4%' }} onClick={loadAllMoment}>
                            <i className={"fas fa-camera-retro"} > All moments </i>
                        </div>}

                        {showMoments && <div style={{ marginLeft:'4%', marginTop:'5%' }} onClick={loadMyMoment}>
                            <i className={"fas fa-camera-retro"} > My moments </i>
                        </div>}
                </div>
                    
            </div>
            <div className='mainContentWrapper'>
                {groupId && groupId.startsWith('ChatGroups_') && <MainContent groupId={groupId.split('_')[1]} />}
                {groupId && groupId.startsWith('DM_') && <MainContentDM groupId={groupId.split('_')[1]} />}
                {showAllMoments && <AllMoments/>}
                    {showMyMoments && <MyMoments/>}
            </div>
         
            
        </div>
        
        </>
    );
}
export default LeftBar;
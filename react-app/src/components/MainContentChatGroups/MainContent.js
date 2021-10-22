import React, { useEffect }from 'react';
import { useSelector, useDispatch} from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import MembersModal from '../MembersModal';
import AddMemberModal from '../AddMemberModal';
import DeleteGroupModal from '../DeleteGroupModal';
import EditGroupModal from '../EditGroupModal';
import Chat from '../Chat';
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk} from "../../store/dmChannels";
import './MainContent.css';

function MainContent({groupId}) {
    const dispatch = useDispatch();
    const chatGroups = useSelector((state) => state.chatGroups);
    const dmChannels = useSelector((state) => state.dmChannels);
    const currentGroup = chatGroups[groupId] ? chatGroups[groupId] : dmChannels[groupId]
    const currentGroupName = chatGroups[groupId] ? chatGroups[groupId]?.name : dmChannels[groupId]?.name
    const currentGroupId = chatGroups[groupId] ? chatGroups[groupId]?.id : dmChannels[groupId]?.id
    const messagesArr = chatGroups[groupId] ? chatGroups[groupId]?.messages : dmChannels[groupId]?.messages
    const membersObject = chatGroups[groupId] ? chatGroups[groupId]?.members : dmChannels[groupId]?.members
    

    // everytime changing to a different group, will update redux store by putting groupId as dependency list
    useEffect(() => {
        (async () => {
            await dispatch(getChatGroupsThunk())
            await dispatch(getDMChannelsThunk())

        })();
    }, [dispatch, groupId]);

    return (
        <>  
            {currentGroup && <div className='chatHeaderWrapper'>
                <div className='chatHeaderEl'>
                    <h3 style={{ display: 'inline' }}>{currentGroupName}</h3>
                </div>

                <div style={{ display: 'flex', width: '95%', justifyContent: 'end' }}>
                
                    {currentGroup && <MembersModal membersObject={membersObject} currentGroupName={currentGroupName}/>}
                    
                    {currentGroup && <AddMemberModal membersObject={membersObject} currentGroupName={currentGroupName} currentGroupId={currentGroupId}/>}
                   
                    {currentGroup && <EditGroupModal currentGroup={currentGroup}/>}

                    {currentGroup && <DeleteGroupModal currentGroupName={currentGroupName} currentGroupId={currentGroupId} currentGroup={currentGroup} />}

                </div>
                
            </div>}
            
            {currentGroup && messagesArr.map((message,i)=>(
                <div className="eachChatWrapper" key={`message${i}`}>
                    <img className='chatProfilePic' alt='profilePicture' src={membersObject[String(message.userId)].profilePic ? membersObject[String(message.userId)].profilePic : defaultProfilePic}/>{membersObject[String(message.userId)].username}: {message.message}
                </div>
            ))}
           
            <Chat groupId={groupId}/>
        </>
    );
}
export default MainContent;
import React from 'react';
import { useSelector} from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import MembersModal from '../MembersModal';
import AddMemberModal from '../AddMemberModal';
import DeleteGroupModal from '../DeleteGroupModal';
import './MainContent.css';

function MainContent({groupId}) {
    const chatGroups = useSelector((state) => state.chatGroups);
    const dmChannels = useSelector((state) => state.dmChannels);
    const currentGroup = chatGroups[groupId] ? chatGroups[groupId] : dmChannels[groupId]
    const currentGroupName = chatGroups[groupId] ? chatGroups[groupId]?.name : dmChannels[groupId]?.name
    const currentGroupId = chatGroups[groupId] ? chatGroups[groupId]?.id : dmChannels[groupId]?.id
    const messagesArr = chatGroups[groupId] ? chatGroups[groupId]?.messages : dmChannels[groupId]?.messages
    const membersObject = chatGroups[groupId] ? chatGroups[groupId]?.members : dmChannels[groupId]?.members
    

    console.log('!!!messagesArr>>>', messagesArr)
  

    return (
        <>  
            {currentGroup && <div className='chatHeaderWrapper'>
                <div className='chatHeaderEl'>
                    <h3 style={{ display: 'inline' }}>{currentGroupName}</h3>
                </div>

                <div style={{ display: 'flex', width: '95%', justifyContent: 'end' }}>
                
                    {/* <div className='chatHeaderEl' style={{ border: '1px solid lightgray', width:'8%'}}

                    >
                        <i className="fas fa-users" style={{paddingRight: '5px'}}/>
                        {Object.keys(membersObject).length}
                    </div> */}
                    {currentGroup && <MembersModal membersObject={membersObject} currentGroupName={currentGroupName}/>}
                    
                    {/* <div className='chatHeaderEl'>
                        <i className="fas fa-user-plus" />
                    </div> */}
                    {currentGroup && <AddMemberModal membersObject={membersObject} currentGroupName={currentGroupName} currentGroupId={currentGroupId}/>}

                    <div className='chatHeaderEl'>
                        <i className="fas fa-info-circle" />
                    </div>

                    {/* <div className='chatHeaderEl'>
                        <i className="fas fa-trash-alt" />
                    </div> */}

                    {currentGroup && <DeleteGroupModal currentGroupName={currentGroupName} currentGroupId={currentGroupId} currentGroup={currentGroup} />}

                </div>
                
            </div>}
            
            {currentGroup && messagesArr.map((message,i)=>(
                <div className="eachChatWrapper" key={`message${i}`}>
                    <img className='chatProfilePic' alt='profilePicture' src={membersObject[String(message.userId)].profilePic ? membersObject[String(message.userId)].profilePic : defaultProfilePic}/>{membersObject[String(message.userId)].username}: {message.message}
                </div>
            ))}
            <form>
                <input>
                </input>
                <button>Send</button>
            </form>
        </>
    );
}
export default MainContent;
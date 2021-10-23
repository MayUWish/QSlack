import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import MembersModal from '../MembersModal';
import AddMemberModal from '../AddMemberModal';
import DeleteGroupModal from '../DeleteGroupModal';
import EditGroupModal from '../EditGroupModal';
import { getChatGroupsThunk } from "../../store/chatGroups";
import './MainContent.css';

import { io } from 'socket.io-client';
let socket;

function MainContent({groupId}) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session?.user);
    const chatGroups = useSelector((state) => state.chatGroups);
    const dmChannels = useSelector((state) => state.dmChannels);
    const currentGroup = chatGroups[groupId] ? chatGroups[groupId] : dmChannels[groupId]
    const currentGroupName = chatGroups[groupId] ? chatGroups[groupId]?.name : dmChannels[groupId]?.name
    const currentGroupId = chatGroups[groupId] ? chatGroups[groupId]?.id : dmChannels[groupId]?.id
    const messagesArr = chatGroups[groupId] ? chatGroups[groupId]?.messages : dmChannels[groupId]?.messages
    // ensure the message is ordered by createdTime/id
    messagesArr.sort(function (message1, message2) {
        return message1.id - message2.id;
    });
    const membersObject = chatGroups[groupId] ? chatGroups[groupId]?.members : dmChannels[groupId]?.members
    
    const [chatInput, setChatInput] = useState("");

    // everytime changing to a different group, will update redux store by putting groupId as dependency list
    useEffect(() => {
        (async () => {
            await dispatch(getChatGroupsThunk())

        })();
    }, [dispatch, groupId]);

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on(String(groupId), async (chat) => {

            if (chat.action === 'delete') {
                console.log('delete chat!!!', chat)
                await dispatch(getChatGroupsThunk())

            }
            else if (chat.action === 'create') {
                console.log('create chat!!!', chat)
                await dispatch(getChatGroupsThunk())
            }


        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()

        })
    }, [groupId, dispatch])


    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", {
            user: currentUser.username, 
            msg: chatInput, 
            groupId, 
            userId: currentUser.id, 
            action: 'create' });
        setChatInput("")
    }

    const deleteMessage = (e) => {
        e.preventDefault()
        socket.emit("chat", {
            'messageId': e.target.value,
            groupId,
            userId: currentUser.id,
            action: 'delete'
        });
    }

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
                    {+message.userId === +currentUser.id && <div>
                        <button>Edit</button>
                        <button value={message.id} onClick={deleteMessage}>Delete</button>
                    </div>}
                </div>
            ))}
           
            {currentUser && (
                <div>
                    <form onSubmit={sendChat}>
                        <input
                            value={chatInput}
                            onChange={updateChatInput}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </>
    );
}
export default MainContent;
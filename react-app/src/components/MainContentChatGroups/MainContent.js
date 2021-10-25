import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import MembersModal from '../MembersModal';
import AddMemberModal from '../AddMemberModal';
import DeleteGroupModal from '../DeleteGroupModal';
import EditGroupModal from '../EditGroupModal';
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk } from "../../store/dmChannels";
import EditMessageFormModal from '../EditMessageModal';
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
    messagesArr?.sort(function (message1, message2) {
        return message1.id - message2.id;
    });
    const membersObject = chatGroups[groupId] ? chatGroups[groupId]?.members : dmChannels[groupId]?.members
    
    const [messageInput, setMessageInput] = useState("");

    // everytime changing to a different group, will update redux store by putting groupId as dependency list
    useEffect(() => {
        (async () => {
            await dispatch(getChatGroupsThunk())
            // when the other user add the current user into a DM channel or chat groups, and the current user click onto any DM or chat groups, it will re-render to see the new chat groups or DM channel
            await dispatch(getDMChannelsThunk())

        })();
    }, [dispatch, groupId]);

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on(String(groupId), async (chat) => {

            
            if (chat.action === 'create') {
                //console.log('create chat!!!', chat)
                if (!chat.errors) {
                    await dispatch(getChatGroupsThunk())
                    // when the other user add the current user into a DM channel or chat groups, and the current user sends a message, it will re-render to see the new chat groups or DM channel
                    await dispatch(getDMChannelsThunk())
                }
            } 
            else if (chat.action === 'delete') {
                //console.log('delete chat!!!', chat)
                await dispatch(getChatGroupsThunk())
                // when the other user add the current user into a DM channel or chat groups, and the current user sends a message, it will re-render to see the new chat groups or DM channel
                await dispatch(getDMChannelsThunk())

            }

            else if (chat.action === 'edit') {
                //console.log('edit chat!!!', chat)
                if (!chat.errors) {
                    await dispatch(getChatGroupsThunk())
                    // when the other user add the current user into a DM channel or chat groups, and the current user sends a message, it will re-render to see the new chat groups or DM channel
                    await dispatch(getDMChannelsThunk())
                }
            }

        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()

        })
    }, [groupId, dispatch])


    const updateMessageInput = (e) => {
        setMessageInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", {
            user: currentUser.username, 
            msg: messageInput,
            groupId, 
            userId: currentUser.id, 
            action: 'create' });
        setMessageInput("")
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
        <div>
            {currentGroup && <div className='chatHeaderWrapper'>
                <div className='chatHeaderEl'>
                    <h3 style={{ display:'inline'}}>{currentGroupName}</h3>
                </div>

                <div style={{ display: 'flex', width: '95%', justifyContent: 'end' }}>
                
                    {currentGroup && <MembersModal membersObject={membersObject} currentGroupName={currentGroupName}/>}
                    
                    {currentGroup && <AddMemberModal membersObject={membersObject} currentGroupName={currentGroupName} currentGroupId={currentGroupId}/>}
                   
                    {currentGroup && <EditGroupModal currentGroup={currentGroup}/>}

                    {currentGroup && <DeleteGroupModal currentGroupName={currentGroupName} currentGroupId={currentGroupId} currentGroup={currentGroup} />}

                </div>
                
            </div>}
            <div id='messagesDiv' >
            {currentGroup && messagesArr.map((message,i)=>(
                <div className="eachChatWrapperOutside" key={`message${i}`} >
                    <div className="eachChatWrapperInside">
                        <img className='chatProfilePic' alt='profilePicture' src={membersObject[String  (message.userId)].profilePic ? membersObject[String(message.userId)].profilePic : defaultProfilePic}/>
                        <div>
                            <div style={{marginBottom:'1%'}}>
                                {membersObject[String(message.userId)].username}:
                            </div>
                            <div>
                                {message.message}
                            </div>

                        </div>
                    </div>
                    {+message.userId === +currentUser.id && <div style={{marginRight:'2%'}}>
                        <EditMessageFormModal message={message} groupId={groupId} />
                        <button style={{ display: 'inlineBlock'}} className='smallBtn' value={message.id} onClick={deleteMessage}>Delete</button>
                    </div>}
                </div>
            ))}

            </div>
           
            {currentUser && (
                <div id='messageBox'>
                    <form onSubmit={sendChat}>
                        <textarea
                            className='messageInput'
                            value={messageInput}
                            onChange={updateMessageInput}                          
                        />
                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '-4%' }}>
                            <button className='middleBtn2' type="submit" style={{ borderColor: '#183a1d', zIndex:'5' }}>Send</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
export default MainContent;
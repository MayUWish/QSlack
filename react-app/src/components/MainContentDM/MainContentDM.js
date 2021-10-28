import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import { getDMChannelsThunk } from "../../store/dmChannels";
import { getChatGroupsThunk } from "../../store/chatGroups";
import EditMessageFormModal from '../EditMessageModal';
import DeleteMessageFormModal from '../DeleteMessageModal';
import './MainContentDM.css';
import { io } from 'socket.io-client';
let socket;

function MainContentDM({ groupId }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session?.user);
    const dmChannels = useSelector((state) => state.dmChannels);
    const currentGroup = dmChannels[groupId]
    const messagesArr = dmChannels[groupId]?.messages
    // ensure the message is ordered by createdTime/id
    messagesArr?.sort(function (message1, message2) {
        return message1.id - message2.id;
    });
    const membersObject =  dmChannels[groupId]?.members
    const theOtherUser = membersObject?membersObject[(Object.keys(membersObject)?.filter(memberId => +memberId !== +currentUser.id))[0]]:{}
    const [messageInput, setMessageInput] = useState("");


    //everytime changing to a different group, will update redux store by putting groupId as dependency list
    useEffect(() => {
        (async () => {
            await dispatch(getDMChannelsThunk())
            // when the other user add the current user into a DM channel or chat groups, and the current user sends a message, it will re-render to see the new chat groups or DM channel
            await dispatch(getChatGroupsThunk())

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
                    await dispatch(getDMChannelsThunk())
                    // when the other user add the current user into a DM channel or chat groups, and the current user sends a message, it will re-render to see the new chat groups or DM channel
                    await dispatch(getChatGroupsThunk())
                } 
            }
            else if (chat.action === 'delete') {
                //console.log('delete chat!!!', chat)
                await dispatch(getDMChannelsThunk())
                // when the other user add the current user into a DM channel or chat groups, and the current user sends a message, it will re-render to see the new chat groups or DM channel
                await dispatch(getChatGroupsThunk())

            }
            else if (chat.action === 'edit') {
                //console.log('edit chat!!!', chat)
                if (!chat.errors) {
                    await dispatch(getDMChannelsThunk())
                    // when the other user add the current user into a DM channel or chat groups, and the current user sends a message, it will re-render to see the new chat groups or DM channel
                    await dispatch(getChatGroupsThunk())
                }               
            }
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()

        })
    }, [groupId,dispatch])

    const updateMessageInput = (e) => {
        setMessageInput(e.target.value)
        
    };

    const createMessage = (e) => {
        e.preventDefault()
        socket.emit("chat", {
            user: currentUser.username, 
            msg: messageInput, 
            groupId, 
            userId: currentUser.id, 
            action: 'create' });
        setMessageInput("")
 
    }

    // const deleteMessage = (e) => {
    //     e.preventDefault()
    //     socket.emit("chat", {
    //         'messageId': e.target.value,
    //         groupId,
    //         userId: currentUser.id,
    //         action: 'delete',
    //     });
    // }

    
 

    return (
        <div id="main">
            {currentGroup && <div className='chatHeaderWrapper'>
                <div className='chatHeaderEl'>
                    <h3 style={{ display: 'inline' }}>{theOtherUser?.username}</h3>
                </div>

            </div>}
            <div id='messagesDiv' >
                {currentGroup && messagesArr.map((message, i) => (
                    <div className="eachChatWrapperOutside" key={`message${i}`}>
                        <div className="eachChatWrapperInside">
                            <img className='chatProfilePic' alt='profilePicture' src={membersObject[String(message.userId)].profilePic ? membersObject[String(message.userId)].profilePic : defaultProfilePic} />
                            <div>
                                <div style={{ marginBottom: '1%' }}>
                                    {membersObject[String(message.userId)].username}: 

                                </div>
                                <div>
                                    {message.message}
                                </div>
                            </div>
                        </div>
                        {+message.userId === +currentUser.id && <div style={{ marginRight: '2%' }}>
                            <EditMessageFormModal message={message} groupId={groupId}/> 
                            <DeleteMessageFormModal messageId={message.id} groupId={groupId} />
                            {/* <button style={{display:'inline'}} className='smallBtn' value={message.id} onClick={deleteMessage}>Delete</button> */}
                        </div>}
                        
                    </div>
                ))}
            </div>
            {currentUser && (
                <div id='messageBox'>
                <form onSubmit={createMessage}>
                    <textarea
                        className='messageInput'
                        value={messageInput}
                        onChange={updateMessageInput}
                       
                    />
                        <div style={{ display: 'flex', justifyContent: 'end', marginTop: '-40px'}}>
                            <button className='middleBtn2' type="submit" style={{ borderColor: '#183a1d', zIndex: '5'}}>Send</button>
                    </div>
                </form>
            </div>
            )}
        </div>
    );
}
export default MainContentDM;
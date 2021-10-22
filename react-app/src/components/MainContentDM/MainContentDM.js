import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
// import DeleteGroupModal from '../DeleteGroupModal';
import Chat from '../Chat';
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk } from "../../store/dmChannels";
import './MainContentDM.css';

import { io } from 'socket.io-client';
let socket;

function MainContentDM({ groupId }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session?.user);
    const dmChannels = useSelector((state) => state.dmChannels);
    const currentGroup = dmChannels[groupId]
    const messagesArr = dmChannels[groupId]?.messages
    const membersObject =  dmChannels[groupId]?.members
    const theOtherUser = membersObject?membersObject[(Object.keys(membersObject)?.filter(memberId => +memberId !== +currentUser.id))[0]]:{}
    
    //everytime changing to a different group, will update redux store by putting groupId as dependency list
    useEffect(() => {
        (async () => {
            await dispatch(getDMChannelsThunk())

        })();

        
    }, [dispatch, groupId]);

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on(String(groupId), async (chat) => {

            if (chat.action === 'delete') {
                console.log('delete chat!!!', chat)
                await dispatch(getDMChannelsThunk())
            }
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
            // clear messages array when the component unmouts, otherwise going to different groups the messageArr will be there

        })
    }, [groupId,dispatch])

    const deleteMessage =(e)=>{
        e.preventDefault()
        socket.emit("chat", { 
            'messageId':e.target.value,
            groupId,
            action: 'delete'
        } );
    }

    return (
        <>
            {currentGroup && <div className='chatHeaderWrapper'>
                <div className='chatHeaderEl'>
                    <h3 style={{ display: 'inline' }}>{theOtherUser?.username}</h3>
                </div>

            </div>}

            {currentGroup && messagesArr.map((message, i) => (
                <div className="eachChatWrapper" key={`message${i}`}>
                    <img className='chatProfilePic' alt='profilePicture' src={membersObject[String(message.userId)].profilePic ? membersObject[String(message.userId)].profilePic : defaultProfilePic} />{membersObject[String(message.userId)].username}: {message.message}
                    {+message.userId === +currentUser.id && <div>
                        <button>Edit</button>
                        <button value={message.id} onClick={deleteMessage}>Delete</button>
                    </div>}
                    
                </div>
            ))}
            <Chat groupId={groupId} deleteMessage={deleteMessage}/>
        </>
    );
}
export default MainContentDM;
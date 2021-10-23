import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import { getDMChannelsThunk } from "../../store/dmChannels";
import EditMessageFormModal from '../EditMessageModal';
import './MainContentDM.css';
// import { Modal } from '../../context/Modal';
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
    
    const [chatInput, setChatInput] = useState("");
    // edit messages
    // const [showModal, setShowModal] = useState(false);
    // const [errors, setErrors] = useState([]);
    // const [updatedMessage, setUpdatedMessage] = useState('');

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
            else if (chat.action === 'create') {
                console.log('create chat!!!', chat)
                await dispatch(getDMChannelsThunk())
            }
            else if (chat.action === 'edit') {
                console.log('edit chat!!!', chat)
                await dispatch(getDMChannelsThunk())
            }
            

        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()

        })
    }, [groupId,dispatch])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const createMessage = (e) => {
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
            action: 'delete',
        });
    }

    // eidt messages:
    // const updateMessage = e => {
    //     setUpdatedMessage(e.target.value)
    // }

    // const cancelEdit = e => {
    //     e.preventDefault()
    //     setShowModal(false)
    // }

    // const editMessage = (e) => {
    //     e.preventDefault()
    //     socket.emit("chat", {
    //         // 'messageId': message.id,
    //         msg: updatedMessage,
    //         groupId,
    //         userId: currentUser.id,
    //         action: 'edit'
    //     });
    // }

    // const EditButton = ({ message}) => {
    //     return (<div >
    //     <button onClick={() => setShowModal(true)}>
    //         Edit
    //     </button>
    //     {showModal && (
    //         <Modal onClose={() => setShowModal(false)}>
    //             <EditMessageForm message={message}/>
    //         </Modal>
    //     )}
    // </div>)

    // const EditMessageForm =(
    //     <form onSubmit={editMessage}>
    //         <div>
    //             {errors.map((error, ind) => (
    //                 <div key={ind}>{error}</div>
    //             ))}
    //         </div>
    //         <div>
    //             <input
    //                 type='text'
    //                 name='message'
    //                 onChange={updateMessage}
    //                 value={updatedMessage}
    //             ></input>
    //         </div>


    //         <button type='submit'>Edit</button>
    //         <button onClick={cancelEdit}>Cancel</button>
    //     </form>
        
    // )

    
    

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
                        {/* <button value={message.id} onClick={editMessage} >Edit</button> */}
                        <EditMessageFormModal message={message} socket={socket} groupId={groupId}/>
                        {/* <EditButton message={message}/> */}
                        <button value={message.id} onClick={deleteMessage}>Delete</button>
                    </div>}
                    
                </div>
            ))}
            {currentUser && (
            <div>
                <form onSubmit={createMessage}>
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
export default MainContentDM;
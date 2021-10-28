import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

let socket;
const EditMessageForm = ({ setShowModal, message, groupId }) => {
    const [errors, setErrors] = useState([]);
    const [updatedMessage, setUpdatedMessage] = useState(message.message);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on(String(groupId), async (chat) => {
            if (chat.action === 'edit') {
                //console.log('edit chat!!!', chat)
                if (chat.errors) {
                    setErrors(chat.errors)
                    alert(chat.errors[0])
                } else {
                    setShowModal(false)
                }
                
            }
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()

        })
    }, [groupId, dispatch, setShowModal])


    const updateMessage = e =>{
        setUpdatedMessage(e.target.value)
    }

    const cancelEdit = e => {
        e.preventDefault()
        setShowModal(false)
    }

    const editMessage = (e) => {
        e.preventDefault()
        socket.emit("chat", {
            'messageId': message.id,
            msg: updatedMessage,
            groupId,
            userId: user.id,
            action: 'edit'
        });
    }


    return (
        <form onSubmit={editMessage} className='formWrapper'>
            <div className='errorDiv'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className='formInputWrapper'>
                <textarea
                    
                    name='message'
                    onChange={updateMessage}
                    value={updatedMessage}
                    className='messageInput'

                ></textarea>
            </div>

            <div tyle={{ display: 'flex'}}>
                <button style={{  marginLeft:'25%', height:'30px',width:'55px' }} className='btn' type='submit'>Edit</button>
                <button style={{ marginLeft: '25%', height: '30px', width: '70px' }}className='btn' onClick = {cancelEdit}>Cancel</button>
            </div>
        </form>
    )

};

export default EditMessageForm;
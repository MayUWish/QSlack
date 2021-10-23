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
        <form onSubmit={editMessage}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <input
                    type='text'
                    name='message'
                    onChange={updateMessage}
                    value={updatedMessage}
                ></input>
            </div>


            <button type='submit'>Edit</button>
            <button onClick = {cancelEdit}>Cancel</button>
        </form>
    )

};

export default EditMessageForm;
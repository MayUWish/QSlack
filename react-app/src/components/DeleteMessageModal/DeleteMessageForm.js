import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

let socket;
const DeleteMessageForm = ({ setShowModal, messageId, groupId }) => {

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    
    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on(String(groupId), async (chat) => {
            if (chat.action === 'delete') {
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



    const onDelete = async (e) => {
        e.preventDefault();
        socket.emit("chat", {
            'messageId': messageId,
            groupId,
            userId: currentUser.id,
            action: 'delete'
        });
    }

    const onCancel = async (e) => {
        e.preventDefault();
        setShowModal(false)

    }


    return (
        <form onSubmit={onDelete} className='formWrapper'>
            <div style={{ color: '#f0a04b' }}>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>

            <h4 style={{ textAlign: 'center' }}>
                {`Are you sure to delete the message?`}
            </h4>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%', gap: '5%' }}>
                <button className='btn' type='submit'>Delete</button>
                <button className='btn' onClick={onCancel}>Cancel</button>
            </div>

        </form>
    )

};

export default DeleteMessageForm;
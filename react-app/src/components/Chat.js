import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';
import defaultProfilePic from '../static/images/defaultProfilePic.png';
let socket;

const Chat = ({ groupId}) => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on(String(groupId), (chat) => {
            console.log('chat!!!', chat)
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
            // clear messages array when the component unmouts, otherwise going to different groups the messageArr will be there
            setMessages([])
        })
    }, [groupId])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput, groupId, userId:user.id });
        setChatInput("")
    }

    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind} className="eachChatWrapper">
                        <img className='chatProfilePic' alt='profilePicture' src={message.profilePic ? message.profilePic : defaultProfilePic} />
                        {message.user}: {message.msg}
                    </div>
                    
                    
                
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;

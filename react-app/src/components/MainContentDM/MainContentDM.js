import React from 'react';
import { useSelector } from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import DeleteGroupModal from '../DeleteGroupModal';
import './MainContentDM.css';

function MainContentDM({ groupId }) {
    const currentUser = useSelector((state) => state.session?.user);
    const dmChannels = useSelector((state) => state.dmChannels);
    const currentGroup = dmChannels[groupId]
    const messagesArr = dmChannels[groupId]?.messages
    const membersObject =  dmChannels[groupId]?.members
    const theOtherUser = membersObject[(Object.keys(membersObject)?.filter(memberId => +memberId !== +currentUser.id))[0]]
    

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
export default MainContentDM;
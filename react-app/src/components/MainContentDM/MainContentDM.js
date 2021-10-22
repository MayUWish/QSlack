import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
// import DeleteGroupModal from '../DeleteGroupModal';
import Chat from '../Chat';
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk } from "../../store/dmChannels";
import './MainContentDM.css';

function MainContentDM({ groupId }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session?.user);
    const dmChannels = useSelector((state) => state.dmChannels);
    const currentGroup = dmChannels[groupId]
    const messagesArr = dmChannels[groupId]?.messages
    const membersObject =  dmChannels[groupId]?.members
    const theOtherUser = membersObject?membersObject[(Object.keys(membersObject)?.filter(memberId => +memberId !== +currentUser.id))[0]]:{}
    
    // everytime changing to a different group, will update redux store by putting groupId as dependency list
    useEffect(() => {
        (async () => {
            await dispatch(getChatGroupsThunk())
            await dispatch(getDMChannelsThunk())

        })();
    }, [dispatch, groupId]);

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
            <Chat groupId={groupId} />
        </>
    );
}
export default MainContentDM;
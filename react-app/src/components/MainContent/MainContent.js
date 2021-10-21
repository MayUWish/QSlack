import React from 'react';
import { useSelector} from "react-redux";

function MainContent({groupId}) {
    const chatGroups = useSelector((state) => state.chatGroups);
    const dmChannels = useSelector((state) => state.dmChannels);
    const messagesArr = chatGroups[groupId] ? chatGroups[groupId].messages : dmChannels[groupId].messages
    const membersObject = chatGroups[groupId] ? chatGroups[groupId].members : dmChannels[groupId].members

    console.log('!!!messagesArr>>>', messagesArr)


    return (
        <>
            {messagesArr.map((message,i)=>(
                <div key={`message${i}`}>
                    {membersObject[String(message.userId)].username}: {message.message}
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
export default MainContent;
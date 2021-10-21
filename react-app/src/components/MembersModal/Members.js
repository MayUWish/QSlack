import React from 'react';
import defaultProfilePic from '../../static/images/defaultProfilePic.png';



const Members = ({ membersObject, currentGroupName }) => {
    
    

    return (
        <div>
            <h3>{currentGroupName}</h3>
            {Object.keys(membersObject).map((memberId, i) => (
                <div className="eachChatWrapper" key={`message${i}`}>
                    <img className='chatProfilePic' alt='profilePicture' src={membersObject[memberId].profilePic ? membersObject[memberId].profilePic : defaultProfilePic} /> {membersObject[memberId].username}
                </div>
            ))}
            
        </div>
    );
};

export default Members;
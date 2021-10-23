import React, { useState } from 'react';
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import { useSelector, useDispatch } from 'react-redux'
import { addMemberThunk } from "../../store/chatGroups";



const AddMemberForm = ({ membersObject, currentGroupName, currentGroupId, setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');

    const allUsers = useSelector(state => state.session.allUsers );
    const currentMemberNames = Object.keys(membersObject).map(memberId => membersObject[memberId].username)
    const dispatch = useDispatch();


    const onAdd = async (e) => {
        e.preventDefault();
        //console.log('currentGroupId', currentGroupId)
        //console.log('username', username)
        const data = await dispatch(addMemberThunk({ 'groupId': currentGroupId, username}));
        if (data && data.errors) {
            setErrors(data.errors)
        } else{
            setErrors([])
            setShowModal(false)
        }

    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div>
            <h3>{currentGroupName}</h3>
            <form onSubmit={onAdd}>
                <div>
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
                <div>
                  <label>User Name</label>
                  <input
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                    placeholder='add a user by name'
                  ></input>
                </div>
                <button type='submit'>Add</button>
            </form>
            
            
            {allUsers.map((member, i) => (
                <div className="eachChatWrapper" key={`message${i}`}>
                    <img className='chatProfilePic' alt='profilePicture' src={member.profilePic ? member.profilePic : defaultProfilePic} /> {currentMemberNames.includes(member.username) ? <><div>{member.username}</div> <div>current member</div> </> : <div>{member.username}</div> }
                </div>
            ))}

        </div>
    );
};

export default AddMemberForm ;
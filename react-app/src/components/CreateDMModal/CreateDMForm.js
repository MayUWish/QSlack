import React, { useState } from 'react';
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import { useSelector, useDispatch } from 'react-redux'
import { createDMChannelsThunk } from "../../store/dmChannels";



const CreateDMForm = ({ setShowModal, setGroupId }) => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');

    const allUsers = useSelector(state => state.session.allUsers);
    const dispatch = useDispatch();


    const onAdd = async (e) => {
        e.preventDefault();
        const newDMChannel = {
            name:username,
            isDM:true,
            
        }
        const data = await dispatch(createDMChannelsThunk(newDMChannel));
        if (data && data.errors) {
            setErrors(data.errors)
        } else if (data && data.dmChannelId){
            // this is how groupId is set to be differentiated between DM channels and  chat groups
            setGroupId(`DM_${data.dmChannelId}`)
            setErrors([])
            setShowModal(false)
        }
        else {
            setErrors([])
            setShowModal(false)
        }

    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div className='formWrapper'>
            <h3>Direct Messages With:</h3>
            <form onSubmit={onAdd}>
                <div style={{ color: '#f0a04b' }}>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div style={{ display: 'inline' }}>
                    <input
                        type='text'
                        name='username'
                        onChange={updateUsername}
                        value={username}
                        placeholder='By name'
                        className='formInput'
                    ></input>
                </div>
                <button style={{ display: 'inline-block'}} className='btn' type='submit'>Go</button>
            </form>

            <div>
                {allUsers.map((member, i) => (
                    <div className="eachChatWrapper" key={`message${i}`}>
                        <img style={{display:'inline'}} className='chatProfilePic' alt='profilePicture' src={member.profilePic ? member.profilePic : defaultProfilePic} /> {member.username}
                    </div>
                ))}

           </div>
            

        </div>
    );
};

export default CreateDMForm;
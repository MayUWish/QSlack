import React, { useState } from 'react';
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import { useSelector, useDispatch } from 'react-redux'
import { createDMChannelsThunk } from "../../store/dmChannels";



const CreateDMForm = ({setShowModal }) => {
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
        } else {
            setErrors([])
            setShowModal(false)
        }

    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    return (
        <div>
            <h3>Direct Messages With:</h3>
            <form onSubmit={onAdd}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        type='text'
                        name='username'
                        onChange={updateUsername}
                        value={username}
                        placeholder='by name'
                    ></input>
                </div>
                <button type='submit'>Go</button>
            </form>


            {allUsers.map((member, i) => (
                <div className="eachChatWrapper" key={`message${i}`}>
                    <img className='chatProfilePic' alt='profilePicture' src={member.profilePic ? member.profilePic : defaultProfilePic} /> <div>{member.username}</div>
                </div>
            ))}

        </div>
    );
};

export default CreateDMForm;
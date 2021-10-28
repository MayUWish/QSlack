import React, { useState } from 'react';
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import { useSelector, useDispatch } from 'react-redux'
import { createDMChannelsThunk } from "../../store/dmChannels";
import CloseModalButton from '../CloseModal';



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

            //remove highlighted on left bar
            const dmParentEl = document.getElementsByClassName("groupsWrapper")[0].querySelectorAll(".highlight");;
            const chatGroupsParentEl = document.getElementsByClassName("groupsWrapper")[1].querySelectorAll(".highlight");
            const momentParentEl = document.getElementsByClassName("groupsWrapper")[2].querySelectorAll(".highlight");
            dmParentEl.forEach(e => e.classList.remove("highlight"));
            chatGroupsParentEl.forEach(e => e.classList.remove("highlight"));
            momentParentEl.forEach(e => e.classList.remove("highlight"));
            document.getElementById(`DM_${data.dmChannelId}`)?.classList.add('highlight');
        }
        else {
            setErrors([])
            setShowModal(false)
        }

    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
        setErrors([])
    };

    return (
        <div className='formWrapper'>
            <CloseModalButton setShowModal={setShowModal} />
            <h3 style={{ paddingLeft: '2%' }}>Direct Messages With:</h3>
            <form onSubmit={onAdd} style={{ paddingLeft: '2%' }}>
                <div style={{ color: '#f0a04b' }}>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div style={{ display: 'flex',gap:'1%', alignItems:'flex-end' }}>
                    <input
                        type='text'
                        name='username'
                        onChange={updateUsername}
                        value={username}
                        placeholder='By name'
                        className='formInput'
                    ></input>
                    <button style={{ display: 'inline-block' }} className='btn' type='submit'>Invite</button>

                </div>
            </form>

            <div style={{ paddingLeft: '2%' }}>
                {allUsers.map((member, i) => (
                    (member.username.toLowerCase().includes(username.toLowerCase()) || !username.replace(/ /g, '')) && <div className="eachChatWrapper" key={`message${i}`}>
                        <img style={{display:'inline'}} className='chatProfilePic' alt='profilePicture' src={member.profilePic ? member.profilePic : defaultProfilePic} /> {member.username}
                    </div>
                ))}

           </div>
            

        </div>
    );
};

export default CreateDMForm;
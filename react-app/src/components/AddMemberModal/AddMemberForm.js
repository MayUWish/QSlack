import React, { useState } from 'react';
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import { useSelector, useDispatch } from 'react-redux'
import { addMemberThunk } from "../../store/chatGroups";
import CloseModalButton from '../CloseModal'



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
        }else{
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
            <h3 style={{ paddingLeft: '2%' }}>{currentGroupName}</h3>
            <form onSubmit={onAdd} style={{ paddingLeft: '2%' }}>
                <div style={{ color: '#f0a04b' }}>
                  {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                  ))}
                </div>
                <div style={{display:'flex', alignItems:'flex-end',gap:'1%'}}>
                  {/* <label>User Name</label> */}
                  <input
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                    placeholder='Invite a user by name'
                    className='formInput'
                  ></input>
                    <button className='btn' type='submit' >Invite</button>
                </div>
                
            </form>
            
            
            {allUsers.map((member, i) => (
                (member.username.toLowerCase().includes(username.toLowerCase()) || !username.replace(/ /g, '')) && <div className="eachChatWrapper" key={`message${i}`} style={{ paddingLeft: '2%' }}>
                    <img className='chatProfilePic' alt='profilePicture' src={member.profilePic ? member.profilePic : defaultProfilePic} /> 
                    
                    {currentMemberNames.includes(member.username) ? <>{member.username} <div style={{display:'inline-block'}}>(present)</div> </> : <span>{member.username}</span> }
                </div>
            ))}

        </div>
    );
};

export default AddMemberForm ;
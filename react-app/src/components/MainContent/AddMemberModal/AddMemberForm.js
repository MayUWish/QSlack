import React, { useState } from 'react';
import defaultProfilePic from '../../../static/images/defaultProfilePic.png';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';



const AddMemberForm = ({ membersObject, currentGroupName }) => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onAdd = async (e) => {
        e.preventDefault();
   
        const data = await dispatch();
        if (data) {
            setErrors(data)
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
                  ></input>
                </div>
                <button type='submit'>Add</button>
            </form>
            
            {Object.keys(membersObject).map((memberId, i) => (
                <div className="eachChatWrapper" key={`message${i}`}>
                    <img className='chatProfilePic' alt='profilePicture' src={membersObject[memberId].profilePic ? membersObject[memberId].profilePic : defaultProfilePic} /> {membersObject[memberId].username}
                </div>
            ))}

        </div>
    );
};

export default AddMemberForm ;
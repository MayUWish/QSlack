import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChatGroupsThunk } from "../../store/chatGroups";




const CreateMomentForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onCreate = async (e) => {
        e.preventDefault();
        const newChatGroup = {
            name,
            description,
            // adminId:user.id,
            isDM: false,
        }
        const data = await dispatch(createChatGroupsThunk(newChatGroup));
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setShowModal(false)
        }
    }



    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateDescritption = (e) => {
        setDescription(e.target.value);
    };



    return (
        <form onSubmit={onCreate} className='formWrapper'>
            <div style={{ color: '#f0a04b' }}>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className='formInputWrapper'>
                <label>Name</label>
                <input
                    type='text'
                    name='name'
                    onChange={updateName}
                    value={name}
                    className='formInput'
                ></input>
            </div>
            <div className='formInputWrapper'>
                <label>Description</label>
                <input
                    type='text'
                    name='description'
                    onChange={updateDescritption}
                    value={description}
                    className='formInput'
                ></input>
            </div>
            <button className='formBtn' type='submit'>Create chat group</button>
        </form>
    )

};

export default CreateMomentForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editChatGroupsThunk } from "../../store/chatGroups";
import CloseModalButton from '../CloseModal'




const EditProfileForm = ({ setShowEditModal, setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const currentUser = useSelector((state) => state.session?.user);
    const [userName, setUserName] = useState(currentUser.username);
    const [biography, setBiography] = useState(currentUser.biography);

    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onCreate = async (e) => {
        e.preventDefault();
        const editChatGroup = {
            userName,
            biography,
   
        }
        const data = await dispatch(editChatGroupsThunk(editChatGroup));
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setShowEditModal(false)
            setShowModal(false)
        }
    }



    const updateName = (e) => {
        setUserName(e.target.value);
    };

    const updateDescritption = (e) => {
        setBiography(e.target.value);
    };



    return (
        <>
            <CloseModalButton setShowModal={setShowEditModal} />
            <form onSubmit={onCreate} className='formWrapper'>

                <div className='errorDiv'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='formInputWrapper'>
                    <label>User Name</label>
                    <input
                        type='text'
                        name='name'
                        onChange={updateName}
                        value={userName}
                        className='formInput'
                    ></input>
                </div>
                <div className='formInputWrapper'>
                    <label>Biography</label>
                    <input
                        type='text'
                        name='biography'
                        onChange={updateDescritption}
                        value={biography}
                        className='formInput'
                    ></input>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                    <button className='btn' type='submit'>Edit</button>
                </div>
            </form>
        </>
    )

};

export default EditProfileForm;
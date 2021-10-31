import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProfile } from "../../store/session";
import defaultProfilePic from '../../static/images/defaultProfilePic.png'
import CloseModalButton from '../CloseModal'
import { getChatGroupsThunk } from "../../store/chatGroups";
import { getDMChannelsThunk } from "../../store/dmChannels";
import { getMomentsThunk } from "../../store/moments";





const EditProfileForm = ({ setShowEditModal, setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const currentUser = useSelector((state) => state.session?.user);
    const [username, setUserName] = useState(currentUser.username);
    const [biography, setBiography] = useState(currentUser.biography);
    const [profilePic, setProfilePic] = useState(null);

    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("biography", biography);
        formData.append("profilePic", profilePic);
        formData.append('userId', currentUser.id)

        const data = await dispatch(editProfile(formData));
        if (data) {
            setErrors(data)
        } else {
            setShowEditModal(false)
            setShowModal(false)
            await dispatch(getChatGroupsThunk())
            await dispatch(getDMChannelsThunk())
            await dispatch(getMomentsThunk())
        }
    }



    const updateName = (e) => {
        setUserName(e.target.value);
    };

    const updateBiography = (e) => {
        setBiography(e.target.value);
    };

    const updateProfilePic = (e) => {
        setProfilePic(e.target.files[0]);
    };

    return (
        <>
            <CloseModalButton setShowModal={setShowEditModal} />
            <form onSubmit={onEdit} className='formWrapper'>

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
                        value={username}
                        className='formInput'
                    ></input>
                </div>
                <div className='formInputWrapper'>
                    <label>Biography</label>
                    <textarea
                        name='Biography'
                        onChange={updateBiography}
                        value={biography}
                        style={{ resize: 'none', height: '70px' }}
                        className='formInput'
                    ></textarea>
                </div>
                <div style={{ paddingLeft: '40%' }}>
                    <img alt='profilePic'
                        src={currentUser.profilePic ? currentUser.profilePic : defaultProfilePic}
                        style={{ width: '100px', height: '100px', borderRadius: '5px' }}
                    />
                </div>
                <div className='formInputWrapper'>
                    <label>Replace profile picture by</label>
                    <input
                        name='profilePic'
                        type="file"
                        accept="image/*"
                        onChange={updateProfilePic}
                        className="formInput"
                        style={{ border: '1px solid black', cursor: 'pointer' }}
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
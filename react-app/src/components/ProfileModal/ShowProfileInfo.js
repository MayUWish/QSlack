import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Modal } from '../../context/Modal';
import EditProfileForm from './EditProfileForm';
import CloseModalButton from '../CloseModal'
import defaultProfilePic from '../../static/images/defaultProfilePic.png'




const ShowProfileInfo = ({ setShowModal}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const currentUser = useSelector((state) => state.session?.user);
 

    return (
        <div style={{width:'500px'}}>
            <CloseModalButton setShowModal={setShowModal} />
            <div style={{ paddingLeft: '40%'}}>
                <img alt='profilePic'
                    src={currentUser.profilePic ? currentUser.profilePic : defaultProfilePic}
                    style={{ width: '100px', height: '100px', borderRadius: '5px' }}
                />
            </div>
            <div style={{ padding: '5%' }}>
                User Name:  {currentUser.username}
            </div>
            <div style={{ padding: '5%' }}>
                Biography:  {currentUser.biography ? currentUser.biography : 'None'}
            </div>
            <div style={{ padding: '5%' }}>
                Joined QSlack on:  {new Date(currentUser.createdAt).toLocaleDateString()}
            </div >
            
            {<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                <button className='btn' onClick={() => {
                    setShowEditModal(true)
                }}>
                    Edit
                </button>
                {showEditModal && (
                    <Modal onClose={() => setShowEditModal(false)}>
                        <EditProfileForm setShowEditModal={setShowEditModal} setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>}

        </div>
    )

};

export default ShowProfileInfo;
import React, { useState } from 'react';
import { useSelector} from "react-redux";
import { Modal } from '../../context/Modal';
import EditGroupForm from './EditGroupForm';
import CloseModalButton from '../CloseModal'




const ShowGroupInfo= ({ setShowModal, currentGroup }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const currentUser = useSelector((state) => state.session?.user);
    const allUsers = useSelector((state) => state.session?.allUsers);
    const adminUser = allUsers.filter(user => +user.id === +currentGroup.adminId)[0]
    const isAdmin = +currentUser.id === +currentGroup.adminId
 
    return (
        <div style={{ width: '500px' }}>
            <CloseModalButton setShowModal={setShowModal} />
            <div style={{padding:'5%'}}>
                Name:  {currentGroup.name}
            </div>
            <div style={{ padding: '5%' }}>
                Description:  {currentGroup.description ? currentGroup.description : 'None'}
            </div>
            <div style={{ padding: '5%' }}>
                Created by:  {adminUser.username}
            </div >
            <div style={{ padding: '5%' }}>
                Created on  {new Date(currentGroup.createdAt).toLocaleDateString()}
            </div >
            {isAdmin && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                <button className='btn' onClick={() => {
                    // setShowModal(false)
                    setShowEditModal(true)
                    
                    
                }}>
                    Edit
                </button>
                {showEditModal && (
                    <Modal onClose={() => setShowEditModal(false)}>
                        <EditGroupForm setShowEditModal={setShowEditModal} setShowModal={setShowModal} currentGroup={currentGroup}/>
                    </Modal>
                )}
            </div>}
                     
        </div>
    )

};

export default ShowGroupInfo;

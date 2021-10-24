import React, { useState } from 'react';
import { useSelector} from "react-redux";
import { Modal } from '../../context/Modal';
import EditGroupForm from './EditGroupForm';




const ShowGroupInfo= ({ setShowModal, currentGroup }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const currentUser = useSelector((state) => state.session?.user);
    const isAdmin = +currentUser.id === +currentGroup.adminId
 
    return (
        <div>
            <div style={{padding:'5%'}}>
                Name: {currentGroup.name}
            </div>
            <div style={{ padding: '5%' }}>
                Description: {currentGroup.description ? currentGroup.description : 'None'}
            </div>
            <div style={{ padding: '5%' }}>
                Created on {new Date(currentGroup.createdAt).toLocaleDateString()}
            </div >
            {isAdmin && <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                <button className='btn' onClick={() => {
                    // setShowModal(false)
                    setShowEditModal(true)
                    
                    
                }}>
                    Eidt
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

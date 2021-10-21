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
            <div>
                Name: {currentGroup.name}
            </div>
            <div>
                Description: {currentGroup.description ? currentGroup.description : 'None'}
            </div>
            <div>
                Created on {new Date(currentGroup.createdAt).toLocaleDateString()}
            </div>
            {isAdmin && <div>
                <button onClick={() => {
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

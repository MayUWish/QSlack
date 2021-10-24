import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteGroupForm from './DeleteGroupForm';


function DeleteGroupFormModal({ currentGroupId, currentGroupName, currentGroup } ) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button className='middleBtn' onClick={() => setShowModal(true)}>
                <i className="fas fa-trash-alt fa-2x chatIcon" />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteGroupForm setShowModal={setShowModal} currentGroupId={currentGroupId} currentGroupName={currentGroupName} currentGroup={currentGroup}/>
                </Modal>
            )}
        </div>
    );
}

export default DeleteGroupFormModal;
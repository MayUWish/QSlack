import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import AddMemberForm from './AddMemberForm';


function AddMemberModal({ membersObject, currentGroupName, currentGroupId }) {
    const [showModal, setShowModal] = useState(false);

    return (

        <div className='chatHeaderEl' style={{ border: '1px solid lightgray', width: '8%' }}>
            <button onClick={() => setShowModal(true)}>
                <div className='chatHeaderEl'>
                    <i className="fas fa-user-plus" />
                </div>
            </button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddMemberForm currentGroupName={currentGroupName} membersObject={membersObject} currentGroupId={currentGroupId} />
                </Modal>
            )}
        </div>
    );
}

export default AddMemberModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddMemberForm from './AddMemberForm';


function AddMemberModal({ membersObject, currentGroupName, currentGroupId }) {
    const [showModal, setShowModal] = useState(false);

    return (

        <div>
            <button className='middleBtn' onClick={() => setShowModal(true)}>               
                <i className="fas fa-user-plus fa-2x chatIcon" />
            </button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddMemberForm currentGroupName={currentGroupName} membersObject={membersObject} currentGroupId={currentGroupId} setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    );
}

export default AddMemberModal;
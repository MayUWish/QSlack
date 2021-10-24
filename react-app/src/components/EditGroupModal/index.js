import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ShowGroupInfo from './ShowGroupInfo';


function EditGroupFormModal({ currentGroup}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div >
            <button className='middleBtn' onClick={() => setShowModal(true)}>
                <i className="fas fa-info-circle fa-2x chatIcon" />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ShowGroupInfo setShowModal={setShowModal} currentGroup={currentGroup}/>
                </Modal>
            )}
        </div>
    );
}

export default EditGroupFormModal;
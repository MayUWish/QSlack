import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateDMForm from './CreateDMForm';


function CreateDMModal({ setGroupId}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{ textAlign: 'end' }}>
            <button className='smallBtn' onClick={() => setShowModal(true)}>
                <i className="fas fa-plus"  />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateDMForm setShowModal={setShowModal} setGroupId={setGroupId} />
                </Modal>
            )}
        </div>
    );
}

export default CreateDMModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateMomentForm from './CreateMomentForm';


function CreateGroupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{ textAlign: 'end' }}>
            <button className='smallBtn' onClick={() => setShowModal(true)}>
                <i className="fas fa-camero-retro" />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateMomentForm setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}

export default CreateGroupFormModal;
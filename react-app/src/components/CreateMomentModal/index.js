import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateMomentForm from './CreateMomentForm';


function CreateMomentFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{ textAlign: 'end' }}>
            <button className='smallBtn' onClick={() => setShowModal(true)}>
                <i className="fas fa-plus" />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateMomentForm setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}

export default CreateMomentFormModal;
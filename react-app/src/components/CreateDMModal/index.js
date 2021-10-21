import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateDMForm from './CreateDMForm';


function CreateDMModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div >
            <button onClick={() => setShowModal(true)}>
                <i className="fas fa-plus" style={{ marginLeft: '10%' }} />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateDMForm setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}

export default CreateDMModal;
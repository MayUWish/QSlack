import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditMessageForm from './EditMessageForm';


function EditMessageFormModal({ currentGroup }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div >
            <button onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditMessageForm setShowModal={setShowModal} currentGroup={currentGroup} />
                </Modal>
            )}
        </div>
    );
}

export default EditMessageFormModal;
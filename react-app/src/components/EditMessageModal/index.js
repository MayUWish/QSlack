import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditMessageForm from './EditMessageForm';


function EditMessageFormModal({ message, socket, groupId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div >
            <button onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditMessageForm setShowModal={setShowModal} message={message} socket={socket} groupId={groupId}/>
                </Modal>
            )}
        </div>
    );
}

export default EditMessageFormModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteMessageForm from './DeleteMessageForm';


function DeleteMessageModal({ messageId, groupId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button style={{ display: 'inlineBlock' }}
                className='smallBtn'
                onClick={() => setShowModal(true)}>
                Delete
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteMessageForm setShowModal={setShowModal} messageId={messageId} groupId={groupId} />
                </Modal>
            )}
        </div>
    );
}

export default DeleteMessageModal;
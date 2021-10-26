import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteCommentForm from './DeleteCommentForm';


function DeleteCommentModal({ commentId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button style={{ display: 'inlineBlock'}}
                className='smallBtn'
                onClick={() => setShowModal(true)}>
                Delete
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteCommentForm setShowModal={setShowModal} commentId={commentId} />
                </Modal>
            )}
        </div>
    );
}

export default DeleteCommentModal;
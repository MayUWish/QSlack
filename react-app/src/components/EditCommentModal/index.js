import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCommentForm from './EditCommentForm';


function EditCommentModal({ commentId, momentId, comment, setCommentsShowModal }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <button style={{ display: 'inlineBlock' }}
                className='smallBtn'
                onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm setShowModal={setShowModal} setCommentsShowModal={setCommentsShowModal} commentId={commentId} comment={comment} momentId={momentId} />
                </Modal>
            )}
        </div>
    );
}

export default EditCommentModal;
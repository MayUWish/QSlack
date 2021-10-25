import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteMomentForm from './DeleteMomentForm';


function DeleteMomentModal({ momentId }) {
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
                    <DeleteMomentForm setShowModal={setShowModal} momentId={momentId} />
                </Modal>
            )}
        </div>
    );
}

export default DeleteMomentModal;
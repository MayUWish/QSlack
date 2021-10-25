import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditMomentForm from './EditMomentForm';


function EditMomentModal({ moment, momentId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{ display: 'inline' }}>
            <button style={{ display: 'inline' }} className='smallBtn'
                onClick={() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditMomentForm setShowModal={setShowModal} moment={moment} momentId={momentId} />
                </Modal>
            )}
        </div>
    );
}

export default EditMomentModal;
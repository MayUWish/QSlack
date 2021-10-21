import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateGroupForm from './CreateGroupForm';


function CreateGroupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div >
            <button onClick={() => setShowModal(true)}>
                <i className="fas fa-plus" style={{ marginLeft: '10%' }} />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateGroupForm />
                </Modal>
            )}
        </div>
    );
}

export default CreateGroupFormModal;
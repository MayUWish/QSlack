import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';


function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div >
            <button onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </div>
    );
}

export default SignUpFormModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ShowProfileInfo from './ShowProfileInfo';


function ProfileModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div >
            <button className='btn' 
                    style={{
                        border: 'none',
                        color: '#183a1d',
                        fontWeight: 'bold',
                        height: '30px',
                        width: '85px',
                        textAlign: 'start'
                    }}
                    onClick={() => setShowModal(true)}>
                Profile
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ShowProfileInfo setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    );
}

export default ProfileModal;
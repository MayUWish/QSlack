import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateMomentForm from './CreateMomentForm';
import { authenticate } from "../../store/session";
import { useDispatch } from 'react-redux';


function CreateMomentFormModal({ setShowMyMoments, setShowAllMoments, setGroupId}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    return (
        <div style={{ textAlign: 'end' }}>
            <button className='smallBtn' 
                onClick={async() => {
                    setShowModal(true)
                    await dispatch(authenticate())
                    }}>
                <i className="fas fa-plus" />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateMomentForm setShowModal={setShowModal} setShowMyMoments={setShowMyMoments} setShowAllMoments={setShowAllMoments} setGroupId={setGroupId} />
                </Modal>
            )}
        </div>
    );
}

export default CreateMomentFormModal;
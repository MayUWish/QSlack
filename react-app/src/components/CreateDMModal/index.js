import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateDMForm from './CreateDMForm';
import { authenticate } from "../../store/session";
import { useDispatch } from 'react-redux';


function CreateDMModal({ setGroupId}) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    return (
        <div style={{ textAlign: 'end' }}>
            <button className='smallBtn' 
                    onClick={async() => {
                        setShowModal(true)
                        await dispatch(authenticate())
                        }}>
                <i className="fas fa-plus"  />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateDMForm setShowModal={setShowModal} setGroupId={setGroupId} />
                </Modal>
            )}
        </div>
    );
}

export default CreateDMModal;
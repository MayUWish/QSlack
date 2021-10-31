import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateGroupForm from './CreateGroupForm';
import { authenticate } from "../../store/session";
import { useDispatch } from 'react-redux';



function CreateGroupFormModal() {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    return (
        <div style={{textAlign:'end'}}>
            <button className= 'smallBtn' 
                    onClick={async() => {
                        setShowModal(true)
                        await dispatch(authenticate())
                        }}>
                <i className="fas fa-plus" />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateGroupForm setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    );
}

export default CreateGroupFormModal;
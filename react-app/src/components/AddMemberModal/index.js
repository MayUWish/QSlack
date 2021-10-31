import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddMemberForm from './AddMemberForm';
import { authenticate } from "../../store/session";
import { useDispatch } from 'react-redux';


function AddMemberModal({ membersObject, currentGroupName, currentGroupId }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    return (

        <div>
            <button className='middleBtn' 
                    onClick={async() => {
                        setShowModal(true)
                        await dispatch(authenticate())
                        }}>               
                <i className="fas fa-user-plus fa-2x chatIcon" />
            </button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddMemberForm currentGroupName={currentGroupName} membersObject={membersObject} currentGroupId={currentGroupId} setShowModal={setShowModal}/>
                </Modal>
            )}
        </div>
    );
}

export default AddMemberModal;
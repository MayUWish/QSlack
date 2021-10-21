import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import Members from './Members';


function MembersModal({ membersObject, currentGroupName}) {
    const [showModal, setShowModal] = useState(false);

    return (
    
        <div className='chatHeaderEl' style={{ border: '1px solid lightgray', width:'8%'}}>
                <button onClick={() => setShowModal(true)}>
                    <i className="fas fa-users" style={{ paddingRight: '5px' }} />
                    {Object.keys(membersObject).length}
                </button>              

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Members currentGroupName={currentGroupName} membersObject={membersObject}/>
                </Modal>
            )}
        </div>
    );
}

export default MembersModal;
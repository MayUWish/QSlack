import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Members from './Members';


function MembersModal({ membersObject, currentGroupName}) {
    const [showModal, setShowModal] = useState(false);

    return (
    
        <div>
            <button className='middleBtn2' onClick={() => setShowModal(true)}>
                <i className="fas fa-users fa-2x chatIcon"  />
                    <div style={{fontWeight:'bolder', fontSize:'larger', display:'inline-block', marginLeft:'5px'}}>{Object.keys(membersObject).length}</div>
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
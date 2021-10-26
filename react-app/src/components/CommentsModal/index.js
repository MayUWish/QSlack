import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Comments from './Comments';


function CommentsModal({moment}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={{ textAlign: 'end' }} >
            <button className='smallBtn' onClick={() => setShowModal(true)} 
                style={{ border: 'none', backgroundColor: 'white' }}>
                <i className="fas fa-comment fa-2x comment"/>
                 {moment.comments.length}
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Comments setShowModal={setShowModal} moment={moment}/>
                </Modal>
            )}
        </div>
    );
}

export default CommentsModal;
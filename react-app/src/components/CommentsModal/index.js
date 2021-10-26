import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Comments from './Comments';


function CommentsModal({moment}) {
    const [showCommentsModal, setCommentsShowModal] = useState(false);

    return (
        <div style={{ textAlign: 'end' }} >
            <button className='smallBtn' onClick={() => setCommentsShowModal(true)}
                style={{ border: 'none', backgroundColor: 'white' }}>
                <i className="fas fa-comment fa-2x comment"/>
                 {moment.comments.length}
            </button>
            {showCommentsModal && (
                <Modal onClose={() => setCommentsShowModal(false)}>
                    <Comments setCommentsShowModal={setCommentsShowModal} moment={moment}/>
                </Modal>
            )}
        </div>
    );
}

export default CommentsModal;
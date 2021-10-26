import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCommentsThunk } from "../../store/moments";



const EditCommentForm = ({ setShowModal, commentId, momentId, setCommentsShowModal, comment }) => {
    const [errors, setErrors] = useState([]);
    const [newComment, setNewComment] = useState(comment);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session?.user);



    const onEdit = async (e) => {
        e.preventDefault();
        const data = await dispatch(editCommentsThunk({ commentId, 
                                                        momentId,
                                                        'comment': newComment,
                                                        'userId': currentUser.id }));
        if (data && data.errors) {
            setErrors(data.errors)
        }
        else {
            setShowModal(false)
            // setCommentsShowModal(false)

        }
    }

    const onCancel = async (e) => {
        e.preventDefault();
        setShowModal(false)

    }


    return (
        <form onSubmit={onEdit} className='formWrapper'>
            <div style={{ color: '#f0a04b' }}>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <label>Comment:</label>
            <div style={{ display: 'inline' }}>
                <input
                    type='text'
                    name='newComment'
                    onChange={e => setNewComment(e.target.value)}
                    value={newComment}
                    placeholder='Comments'
                    className='formInput'
                ></input>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%', gap: '5%' }}>
                <button className='btn' type='submit'>Edit</button>
                <button className='btn' onClick={onCancel}>Cancel</button>
            </div>

        </form>
    )

};

export default EditCommentForm;
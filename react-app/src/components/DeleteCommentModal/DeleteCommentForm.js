import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMomentsThunk } from "../../store/moments";




const DeleteCommentForm = ({ setShowModal, commentId }) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();


    const onDelete = async (e) => {
        e.preventDefault();

        const data = await dispatch(deleteMomentsThunk(commentId));
        if (data && data.errors) {
            setErrors(data.errors)
        }
        // do not use setShowModal(false), otherwise =>>>  Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        // else {
        //     setShowModal(false)          
        // }
    }

    const onCancel = async (e) => {
        e.preventDefault();
        setShowModal(false)

    }


    return (
        <form onSubmit={onDelete} className='formWrapper'>
            <div style={{ color: '#f0a04b' }}>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>

            <h4 style={{ textAlign: 'center' }}>
                {`Are you sure to delete the comment?`}
            </h4>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%', gap: '5%' }}>
                <button className='btn' type='submit'>Delete</button>
                <button className='btn' onClick={onCancel}>Cancel</button>
            </div>

        </form>
    )

};

export default DeleteCommentForm;
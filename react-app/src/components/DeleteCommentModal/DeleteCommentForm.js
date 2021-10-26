import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { deleteCommentsThunk } from "../../store/moments";



const DeleteCommentForm = ({ setShowModal, commentId, momentId, setCommentsShowModal}) => {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
 


    const onDelete = async (e) => {
        e.preventDefault();
        const data = await dispatch(deleteCommentsThunk({commentId, momentId}));
        if (data && data.errors) {
            setErrors(data.errors)
        } 
        else{      
           
            setCommentsShowModal(false)
           
        }
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
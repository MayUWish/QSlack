import React, { useState } from 'react';
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import { useSelector, useDispatch} from "react-redux";


function Comments({ setShowModal, moment}) {
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState('');
    const currentUser = useSelector((state) => state.session?.user);

    const dispatch = useDispatch();


    const onAdd = async (e) => {
        e.preventDefault();

        const data = await dispatch();
        if (data && data.errors) {
            setErrors(data.errors)
        } 
        else {
            setErrors([])
            setShowModal(false)
        }

    };

    const updateComment = (e) => {
        setComment(e.target.value);
    };


    if (!currentUser) {
        return null;
    }

    return (
        <div style={{ width: '500px', height: '500px', overflow: 'auto', fontSize:'smaller',color: 'rgb(24, 24, 24)'}}>
            <form onSubmit={onAdd}>
                <div style={{ color: '#f0a04b' }}>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div style={{ display: 'inline' }}>
                    <input
                        type='text'
                        name='comment'
                        onChange={updateComment}
                        value={comment}
                        placeholder='Comments'
                        className='formInput'
                    ></input>
                </div>
                <button style={{ display: 'inline-block' }} className='btn' type='submit'>Post</button>
            </form>

            <div>
                {moment.comments.map((comment, i) => (
                    <div key={`comment:${comment} ${i}`}>

                        <img src={comment.user.profilePic ? comment.user.profilePic :   defaultProfilePic} alt='profilePic' className='commentProfilePic' />
                        {comment.user.username}: {comment.comment}

                    </div>
                ))}

            </div>
        </div>
    );
}
export default Comments;
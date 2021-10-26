import React, { useState } from 'react';
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import { useSelector, useDispatch} from "react-redux";
import { createCommentsThunk } from "../../store/moments";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../EditCommentModal";

function Comments({ setCommentsShowModal, moment}) {
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState('');
    const currentUser = useSelector((state) => state.session?.user);

    const dispatch = useDispatch();


    const onAdd = async (e) => {
        e.preventDefault();

        const data = await dispatch(createCommentsThunk({'momentId':moment.id, userId: currentUser.id, comment}));
        if (data && data.errors) {
            setErrors(data.errors)
        } 
        else {
            setErrors([])
            setComment('')
            // setCommentsShowModal(false)
        }

    };

    const updateComment = (e) => {
        setComment(e.target.value);
    };


    if (!currentUser) {
        return null;
    }

    return (
        <div style={{ width: '500px', maxHeight: '500px',  minHeight: '300px',
            overflow: 'auto', borderRadius:'5px',
            fontSize:'smaller',color: 'rgb(24, 24, 24)'}}>
            <button style={{ display: 'inline-block' }} 
                    className='smallBtn'
                    onClick={e=>setCommentsShowModal(false)}>
            X</button>
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
                        {+comment.userId === +currentUser.id && <div style={{ marginRight: '2%' }}>
                            <EditCommentModal setCommentsShowModal={setCommentsShowModal} commentId={comment.id} comment={comment.comment} momentId={moment.id} />
                            <DeleteCommentModal setCommentsShowModal={setCommentsShowModal} commentId={comment.id} momentId={moment.id} />
                            
                        </div>}

                    </div>
                ))}

            </div>
        </div>
    );
}
export default Comments;
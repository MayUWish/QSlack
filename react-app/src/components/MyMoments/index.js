import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import DeleteMomentModal from '../DeleteMomentModal'; 
import EditMomentModal from '../EditMomentModal';
import { likeMomentsThunk } from "../../store/moments"
import { authenticate } from '../../store/session';
import CommentsModal from '../CommentsModal';


function MyMoments() {

    const currentUser = useSelector((state) => state.session?.user);
    const moments = useSelector((state) => state.moments);
    const dispatch = useDispatch();

    const postLike = async (e) => {
        e.preventDefault()
        await dispatch(likeMomentsThunk({ 'momentId': e.currentTarget.value, 'userId': currentUser.id }))
        // re-render session:user at redux store as user has likes array for calculating number of likes
        await dispatch(authenticate())

    }

    if (!currentUser) {
        return null;
    }

    return (
        <div className='MomentsWrapper'>
            <h3 style={{ textAlign: 'center', color: '#183a1d' }}>My moments</h3>
            {moments.momentsList.map(momentId => (
                (+moments[momentId].user.id === +currentUser.id) && <div key={momentId} className="momentWrapperOutside">
                    <div className="eachChatWrapperInside">

                        <img className='chatProfilePic' alt='profilePicture' src={moments[momentId].user.profilePic ? moments[momentId].user.profilePic : defaultProfilePic} />
                        <div>
                            <div style={{ marginBottom: '1%' }}>
                                {moments[momentId].user.username}
                            </div>
                            <div>
                                {moments[momentId].description}
                            </div>
                        </div>
                    </div>
                    {moments[momentId].media && <img className='momentMedia' alt='momentPicture' src={moments[momentId].media} />}
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <div className='likeCommentWrapper'>                      

                            <button value={momentId} onClick={postLike} style={{ border: 'none', backgroundColor: 'white' }}>
                                {currentUser.likedMomentId.includes(momentId) ? <i className="fas fa-heart fa-2x like liked" /> : <i className="fas fa-heart fa-2x like" />}
                                {moments[momentId].likes.length ? moments[momentId].likes.length : '0'}
                            </button>

                            <CommentsModal moment={moments[momentId]} />
                        </div>
                        <div style={{ display: 'flex', gap:'3%' }}>
                            <EditMomentModal momentId={momentId} moment={moments[momentId]}/>
                            <DeleteMomentModal momentId={momentId}/>
                        </div>
                    </div>
                    <div className='commentWrapper'>
                        {moments[momentId].comments.map((comment, i) => (
                            <div key={`comment:${comment} ${i}`}>
                                <div>
                                    <img src={comment.user.profilePic ? comment.user.profilePic : defaultProfilePic} alt='profilePic' className='commentProfilePic' />
                                    {comment.user.username}: {comment.comment}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                              
            ))}
        </div>
    );
}
export default MyMoments;
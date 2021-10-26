import React from 'react';
import { useSelector } from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import './AllMoments.css';

function AllMoments() {
 
    const currentUser = useSelector((state) => state.session?.user);
    const moments = useSelector((state) => state.moments);
    // console.log('moments>>>', moments)
    
    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getMomentsThunk())

    //     })();
    // }, [dispatch]);

    if (!currentUser){
        return null;
    }

    const postLike = e =>{

    }

    return (
        <div className='MomentsWrapper'>
            <h3 style={{ textAlign: 'center', color:'#183a1d'}}>Explore all moments</h3>
            {moments.momentsList.map(momentId=>(
            
                <div key={momentId} className="momentWrapperOutside">
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
                    <div className='likeCommentWrapper'>
                        {currentUser.likedMomentId.includes(momentId) ? <i className="fas fa-heart like liked" onClick={postLike}> {moments[momentId].likes.length}</i> : <i className="fas fa-heart like" onClick={postLike}> {moments[momentId].likes.length}</i>}
                        <i className="fas fa-comment comment"> {moments[momentId].comments.length}</i>
                    </div>
                    <div className='commentWrapper'>
                        {moments[momentId].comments.map((comment,i)=>(
                            <div key={`comment:${comment} ${i}`}>
                                <div>
                                    <img src={comment.user.profilePic ? comment.user.profilePic:defaultProfilePic} alt='profilePic' className='commentProfilePic' />
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
export default AllMoments;
import React from 'react';
import { useSelector } from "react-redux";
import defaultProfilePic from '../../static/images/defaultProfilePic.png';
import './AllMoments.css';

function AllMoments() {
 
    const currentUser = useSelector((state) => state.session?.user);
    const moments = useSelector((state) => state.moments);
    console.log('moments>>>', moments)
    
    // useEffect(() => {
    //     (async () => {
    //         await dispatch(getMomentsThunk())

    //     })();
    // }, [dispatch]);

    if (!currentUser){
        return null;
    }

    return (
        <div className='MomentsWrapper'>
   
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
                    <i class="fas fa-heart like"> {moments[momentId].likes.length}</i>
                </div>

            ))}
        </div> 
        );
}
export default AllMoments;
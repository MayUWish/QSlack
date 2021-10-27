import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteChatGroupsThunk } from "../../store/chatGroups";
import CloseModalButton from '../CloseModal'

// import { useHistory } from 'react-router-dom';



const DeleteGroupForm = ({ setShowModal, currentGroupId, currentGroupName, currentGroup  }) => {
    const [errors, setErrors] = useState([]);
    // const history = useHistory()
   

    const user = useSelector(state => state.session.user);
    const isAdmin = +user.id === + currentGroup.adminId
    //console.log('isAdmin>>>>', isAdmin, user.id, currentGroup.adminId)
    const dispatch = useDispatch();


    const onDelete = async (e) => {
        e.preventDefault();

        const data = await dispatch(deleteChatGroupsThunk(currentGroupId));
        if (data && data.errors) {
            setErrors(data.errors)
        } 
        // do not use setShowModal(false), otherwise =>>>  Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        // else {
        //     setShowModal(false)          
        // }
    }


    return (
        <>
        <CloseModalButton setShowModal={setShowModal} />
        <form onSubmit={onDelete} className='formWrapper' style={{marginLeft:'3%'}}>
            <div className='errorDiv'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
           
            <h4>
                {isAdmin ? `Are you sure to delete the chat group, ${currentGroupName}?` : `Are you sure to leave the chat group, ${currentGroupName}?`}
            </h4>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
                <button className='btn' type='submit'>{isAdmin ? 'Delete' : 'Leave'}</button>
            </div>
            
        </form>
        </>
    )

};

export default DeleteGroupForm;
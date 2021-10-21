import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteChatGroupsThunk } from "../../store/chatGroups";

// import { useHistory } from 'react-router-dom';



const DeleteGroupForm = ({ setShowModal, currentGroupId, currentGroupName, currentGroup  }) => {
    const [errors, setErrors] = useState([]);
    // const history = useHistory()
   

    const user = useSelector(state => state.session.user);
    const isAdmin = +user.id === + currentGroup.adminId
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
        <form onSubmit={onDelete}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
           
            <div>
                {isAdmin ? `Are you sure to delete the chat group, ${currentGroupName}?` : `Are you sure to leave the chat group, ${currentGroupName}?`}
            </div>
            <button type='submit'>{isAdmin ?'Delete':'Leave'}</button>
        </form>
    )

};

export default DeleteGroupForm;
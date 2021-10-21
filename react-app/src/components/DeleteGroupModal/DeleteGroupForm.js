import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { createChatGroupsThunk } from "../../store/chatGroups";




const DeleteGroupForm = ({ setShowModal, currentGroupId, currentGroupName  }) => {
    const [errors, setErrors] = useState([]);
   

    const user = useSelector(state => state.session.user);
    const isAdmin = +user.id === + currentGroupId
    const dispatch = useDispatch();


    const onDelete = async (e) => {
        e.preventDefault();

        const data = await dispatch();
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setShowModal(false)
        }
    }


    return (
        <form onSubmit={onDelete}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
           
            <div>
                {isAdmin ? `Are you sure to delete the chat group, ${currentGroupName}?` : `Are you sure to leave the, ${currentGroupName}?`}
            </div>
            <button type='submit'>{isAdmin ?'Delete':'Leave'}</button>
        </form>
    )

};

export default DeleteGroupForm;
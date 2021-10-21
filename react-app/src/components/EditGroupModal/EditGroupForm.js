import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChatGroupsThunk } from "../../store/chatGroups";




const EditGroupForm = ({ setShowEditModal, currentGroup, setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(currentGroup.name);
    const [description, setDescription] = useState(currentGroup.description);

    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onCreate = async (e) => {
        e.preventDefault();
        const newChatGroup = {
            name,
            description,
            // adminId:user.id,
            // isDM:false,
        }
        const data = await dispatch(createChatGroupsThunk(newChatGroup));
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setShowEditModal(false)
            setShowModal(false)
        }
    }



    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateDescritption = (e) => {
        setDescription(e.target.value);
    };



    return (
        <form onSubmit={onCreate}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>Name</label>
                <input
                    type='text'
                    name='name'
                    onChange={updateName}
                    value={name}
                ></input>
            </div>
            <div>
                <label>Description</label>
                <input
                    type='text'
                    name='description'
                    onChange={updateDescritption}
                    value={description}
                ></input>
            </div>
            <button type='submit'>Edit</button>
        </form>
    )

};

export default EditGroupForm;

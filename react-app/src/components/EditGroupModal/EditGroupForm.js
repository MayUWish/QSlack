import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editChatGroupsThunk } from "../../store/chatGroups";
import CloseModalButton from '../CloseModal'




const EditGroupForm = ({ setShowEditModal, currentGroup, setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(currentGroup.name);
    const [description, setDescription] = useState(currentGroup.description);

    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onCreate = async (e) => {
        e.preventDefault();
        const editChatGroup = {
            name,
            description,
            groupId: + currentGroup.id,
            // adminId:user.id,
            // isDM:false,
        }
        const data = await dispatch(editChatGroupsThunk(editChatGroup));
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
        <>
        <CloseModalButton setShowModal={setShowEditModal} />
        <form onSubmit={onCreate} className='formWrapper'>
            
            <div className='errorDiv'>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div className='formInputWrapper'>
                <label>Name</label>
                <input
                    type='text'
                    name='name'
                    onChange={updateName}
                    value={name}
                    className='formInput'
                ></input>
            </div>
            <div className='formInputWrapper'>
                <label>Description</label>
                <input
                    type='text'
                    name='description'
                    onChange={updateDescritption}
                    value={description}
                    className='formInput'
                ></input>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
            <button className='btn' type='submit'>Edit</button>
            </div>
        </form>
        </>
    )

};

export default EditGroupForm;

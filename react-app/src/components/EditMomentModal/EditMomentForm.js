import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import { editMomentsThunk } from "../../store/moments";



const EditMomentForm = ({ setShowModal, moment, momentId }) => {
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState(moment.description);
    const oldMedia = moment.media;
    const [media, setMedia] = useState(null);

    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("description", description);
        formData.append("media", media ? media : oldMedia);
        const data = await dispatch(editMomentsThunk({momentId, formData}));
        if (data && data.errors) {
            setErrors(data.errors)
        } else {          
            setShowModal(false)
        }
    }

    const onCancel = async (e) => {
        e.preventDefault();
        setShowModal(false)

    }

    const updateDescritption = (e) => {
        setDescription(e.target.value);
    };

    const updateMedia = (e) => {
        setMedia(e.target.files[0]);
    };



    return (
        <form onSubmit={onEdit} className='formWrapper'>
            <div style={{ color: '#f0a04b' }}>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
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
            <img alt='momentImage' src={oldMedia} 
                style={{ margin: '0 25%', width: '180px', height: '180px', borderRadius:'5px'}}/>
            <div className='formInputWrapper'>
                <label>Replace the photo by</label>
                <input
                    name='media'
                    type="file"
                    accept="image/*"
                    onChange={updateMedia}
                    className="formInput"
                    style={{ border: '1px solid black', width: '92%' }}
                ></input>
            </div>
            <button className='formBtn' type='submit'>Edit moment</button>
            <button className='formBtn' onClick={onCancel}>Cancel</button>
        </form>
    )

};

export default EditMomentForm;
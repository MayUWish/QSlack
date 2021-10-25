import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMomentsThunk } from "../../store/moments";




const CreateMomentForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState(null);

    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();


    const onCreate = async (e) => {
        e.preventDefault();
        const formData = new FormData(); 
        formData.append("description", description);
        formData.append("media", media);
        const data = await dispatch(createMomentsThunk(formData));
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setShowModal(false)
        }
    }



    const updateDescritption = (e) => {
        setDescription(e.target.value);
    };

    const updateMedia= (e) => {
        setMedia(e.target.files[0]);
    };



    return (
        <form onSubmit={onCreate} className='formWrapper'>
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
            <div className='formInputWrapper'>
                <label>Photo</label>
                <input
                    name='media'
                    type="file"
                    accept="image/*"
                    onChange={updateMedia}
                    className="formInput"
                    style={{ border: '1px solid black' }}
                ></input>
            </div>
            <button className='formBtn' type='submit'>Create moment</button>
        </form>
    )

};

export default CreateMomentForm;

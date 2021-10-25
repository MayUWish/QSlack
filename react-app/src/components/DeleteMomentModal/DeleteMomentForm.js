import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMomentsThunk} from "../../store/moments";




const DeleteMomentForm = ({ setShowModal, momentId }) => {
    const [errors, setErrors] = useState([]);
   
    const user = useSelector(state => state.session.user);


    const dispatch = useDispatch();


    const onDelete = async (e) => {
        e.preventDefault();

        const data = await dispatch(deleteMomentsThunk(momentId));
        if (data && data.errors) {
            setErrors(data.errors)
        }
        // do not use setShowModal(false), otherwise =>>>  Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        // else {
        //     setShowModal(false)          
        // }
    }


    return (
        <form onSubmit={onDelete} className='formWrapper'>
            <div style={{ color: '#f0a04b' }}>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>

            <h4>
                {`Are you sure to delete the moment?`}
            </h4>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
                <button className='btn' type='submit'>Delete</button>
            </div>

        </form>
    )

};

export default DeleteMomentForm;
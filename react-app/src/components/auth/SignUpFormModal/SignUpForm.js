import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import DemoButton from '../DemoButton'
import { Modal } from '../../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm.js'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [biography, setBiography] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      // prepare recipe input data ready for AWS
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("biography", biography);
      formData.append("profilePic", profilePic);

      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      }
    } else{
      setErrors(['Password Confirmation: Password Confirmation does not match Password.'])
    }
  };


  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateBiography = (e) => {
    setBiography(e.target.value);
  };

  const updateProfilePic = (e) => {
    setProfilePic(e.target.files[0]);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='formWrapper'>
      <form onSubmit={onSignUp}>
        <div style={{ color: '#f0a04b' }}>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='formInputWrapper'>
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            className='formInput'
          ></input>
        </div>
        <div className='formInputWrapper'>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            className='formInput'
          ></input>
        </div>
        <div className='formInputWrapper'>
          <label>Biography</label>
          <textarea
            name='Biography'
            onChange={updateBiography}
            value={biography}
            style={{ resize: 'none', height: '70px' }}
            className='formInput'
          ></textarea>
        </div>
        <div className='formInputWrapper'>
          <label>Profile Picture</label>
          <input
            name='profilePic'
            type="file"
            accept="image/*"
            onChange={updateProfilePic}
            className="formInput"
            style={{ border: '1px solid black'}}          
          ></input>
        </div>
        <div className='formInputWrapper'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            className='formInput'
          ></input>
        </div>
        <div className='formInputWrapper'>
          <label>Password Confirmation</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            // required={true}
            className='formInput'
          ></input>
        </div>
        <button className='formBtn' type='submit'>Sign Up</button>
      </form>
      
      <div className='formInputWrapper'>
        Have an account?
        <button onClick={() => {setShowLoginModal(true)}}
          style={{
            marginLeft:'2%',
            borderRadius: '3px',
            fontSize: 'lareger',
            fontWeight: 'bold',
            backgroundColor: '#fefbe9',
          }}>
           Log In
        </button>
        {showLoginModal&& (
          <Modal onClose={() => setShowLoginModal(false)}>
            <LoginForm />
          </Modal>
        )}
		  </div>
      <div className='formInputWrapper' style={{ marginLeft: '30%'}}>
        <DemoButton info={'DEMO'}/>
      </div>
    </div>
  );
};

export default SignUpForm;

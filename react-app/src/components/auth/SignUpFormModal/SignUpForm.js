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
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
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
      
      <div style={{fontSize: 'lareger', fontWeight: 'bold', marginBottom:'2%'}}>
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

      <DemoButton info={'DEMO'}/>
    </div>
  );
};

export default SignUpForm;

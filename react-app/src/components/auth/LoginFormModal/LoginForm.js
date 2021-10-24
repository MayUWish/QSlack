import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import DemoButton from '../DemoButton'
import { Modal } from '../../../context/Modal';
import SignUpForm from '../SignUpFormModal/SignUpForm.js'
import './LoginForm.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [showSignupModal, setShowSignupModal] = useState(false);


  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } 
  };


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/clients/${user.username}`} />;
  }

  return (
    < div className='formWrapper'>
      <form onSubmit={onLogin}>
        <div style={{ color:'#f0a04b'}}>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='formInputWrapper'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            className = 'formInput'
          />
        </div>
        <div className='formInputWrapper'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            className='formInput'
          />
        </div>
        <button className='formBtn' type='submit'>Login</button>
      </form>
     
      <div style={{ fontSize: 'lareger', fontWeight: 'bold', marginBottom: '2%' }}>
        New to QSlack?
        <button onClick={()=>{setShowSignupModal(true)}}        
          style={{
            marginLeft: '2%',
            borderRadius: '3px',
            fontSize: 'lareger',
            fontWeight: 'bold',
            backgroundColor: '#fefbe9',
          }}>
          Sign up
        </button>
        {showSignupModal && (
          <Modal onClose={() => setShowSignupModal(false)}>
            <SignUpForm />
          </Modal>
        )}
		  </div>
      < DemoButton info={'DEMO'} />
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../store/session';
import DemoButton from '../DemoButton'
import { Modal } from '../../../context/Modal';
import SignUpForm from '../SignUpFormModal/SignUpForm.js'

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
    <>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <button type='submit'>Login</button>
        </div>
      </form>
      < DemoButton />
		  <div>
		    New to QSlack?
        <button onClick={() => {
          setShowSignupModal(true)
          }}>
          Sign up
        </button>
        {showSignupModal && (
          <Modal onClose={() => setShowSignupModal(false)}>
            <SignUpForm />
          </Modal>
        )}
		  </div>
    </>
  );
};

export default LoginForm;

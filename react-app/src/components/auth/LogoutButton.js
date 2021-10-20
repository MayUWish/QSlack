import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <button onClick={onLogout}
      style={{ textDecoration: 'none', border:'none', backgroundColor:'white',
                position: 'relative', display: 'inline-block'
          }}
      >Sign out</button>)
};

export default LogoutButton;

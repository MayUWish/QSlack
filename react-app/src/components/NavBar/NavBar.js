import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import LogoutButton from '.././auth/LogoutButton';
import LoginFormModal from '.././auth/LoginFormModal';
import defaultProfilePic from '../../static/images/defaultProfilePic.png'
import './NavBar.css';

const NavBar = () => {
  const user = useSelector((state) => state.session?.user);
  const [show, setShow] = useState(false)
  return (
    <nav className='topNavWrapper'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active' 
            style={{textDecoration:'none'}}
          >
            QSlack
          </NavLink>
        </div>
        {!user && <div className='loginSignupWrapper'>
          {/* <NavLink to='/login' exact={true} activeClassName='active' 
           style={{ display: 'block', textDecoration: 'none'}}>
            Login
          </NavLink> */}
          <LoginFormModal />
        <NavLink to='/sign-up' exact={true} activeClassName='active' 
          style={{ display: 'block', textDecoration: 'none' }}>
            Signup
          </NavLink>
        </div>}
        {user && <div>
          <NavLink to='/users' exact={true} activeClassName='active'
            style={{ textDecoration: 'none' }}>
            Users
          </NavLink>
        </div>}
        {user && <div>
        <img alt='profilePic' 
          src={user.ProfilePic ? user.ProfilePic : defaultProfilePic } 
          style={{width:'60px',height:'50px'}}
          onClick={e=>setShow(show=>!show)}/>
          {show && <LogoutButton />}
        </div>}
    </nav>
  );
}

export default NavBar;

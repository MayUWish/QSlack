import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import ProfileModal from '../ProfileModal';
import defaultProfilePic from '../../static/images/defaultProfilePic.png'
import DemoButton from '../auth/DemoButton'

import './NavBar.css';

const NavBar = ({ page}) => {
  const user = useSelector((state) => state.session?.user);
  const [show, setShow] = useState(false)
  return (
    <nav className='topNavWrapper'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active' 
            style={{textDecoration:'none'}}
          > 
          <h1 style={{ color:'#183a1d', marginLeft:'3%', display:'inline'}}>QSLACK</h1>
          </NavLink>
        </div>
        {!user && <div className='loginSignupWrapper'>
          <DemoButton info={'DEMO'}/>
          <LoginFormModal />
          <SignUpFormModal />
          
        </div>}
        {/* {user && <div>
          <NavLink to='/users' exact={true} activeClassName='active'
            style={{ textDecoration: 'none' }}>
            Users
          </NavLink>
        </div>} */}

        {user && <div style={{display:'flex', gap:'5%'}}>
        <img alt='profilePic' 
          src={user.profilePic ? user.profilePic : defaultProfilePic } 
          style={{ width: '50px', height: '50px', borderRadius: '5px', cursor: 'pointer'}}
          onClick={e=>setShow(show=>!show)}/>
          {show && 
          <div style={{textAlign:'end', width:'100px' }}>
              
              {page==='home' && <NavLink to={`/clients/${user.username}`} exact={true}
                  style={{ textDecoration: 'none', color: '#183a1d', fontWeight: 'bold'}}>
                  Launch 
              </NavLink>}

              {page === 'app' && <ProfileModal />}
            
              <LogoutButton />
            </div>         
          }
        </div>}
    </nav>
  );
}

export default NavBar;

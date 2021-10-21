import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import './logoutButton.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  const user = useSelector((state) => state.session.user)

  return (    
      <button className='logoutBtn' onClick={onLogout}>Log Out</button>
  ) 
    
};

export default LogoutButton;

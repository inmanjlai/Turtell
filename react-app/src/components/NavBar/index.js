import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import Searchbar from '../Searchbar';

const NavBar = () => {

  const user = useSelector((state) => state.session.user)

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active' className='logo'>
            [ Turtell ]
          </NavLink>
        </li>
        {user && <Searchbar />}
        <li className='userAuth'>
          {!user?.id && <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>}
          {!user?.id && <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>}
          {user?.id && <LogoutButton />}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

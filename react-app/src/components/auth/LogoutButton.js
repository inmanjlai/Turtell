import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './logoutButton.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };


  return (    
      <button className='logoutBtn' onClick={onLogout}>Log Out</button>
  ) 
    
};

export default LogoutButton;

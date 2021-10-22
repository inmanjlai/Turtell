import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div className='errors' key={ind}>{error}</div>
        ))}
      </div>
      <div className="form-container">
        <div>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            placeholder='Username'
            value={username}
          ></input>
        </div>
        <div>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            placeholder='Email'
            value={email}
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            placeholder='Password'
            value={password}
          ></input>
        </div>
        <div>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            placeholder='Repeat Password'
            value={repeatPassword}
            required={true}
            className='last-child'
          ></input>
        </div>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;

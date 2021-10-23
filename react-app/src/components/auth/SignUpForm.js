import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const errors = []
    if(password !== repeatPassword) errors.push("Both passwords have to match")
    if(username.length > 25) errors.push("Please limit your username to 25 characters")
    if(email.length > 0 && !email.includes("@")) errors.push("Please enter a valid email address")

    setErrors(errors)
  }, [username, email, password, repeatPassword])

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
      <h1 style={{marginBottom: "15px"}}>Sign Up</h1>
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
      <div className='buttons'>
        <button type='submit' disabled={errors.length > 0 || username.length <= 0 || email.length <= 0 || password.length <= 0 || repeatPassword.length <= 0}>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;

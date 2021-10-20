import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Users/UsersList';
import User from './components/Users/User';
import { authenticate } from './store/session';
import Subreddits from './components/Subreddits';
import CreateSubreddit from './components/Subreddits/CreateSubreddit';
import EditSubreddit from './components/Subreddits/EditSubreddit';
import IndividualSubreddit from './components/Subreddits/IndividualSubreddit';
import CreatePost from './components/Posts/CreatePost';
import IndividualPost from './components/Posts/IndividualPost';
import EditPost from './components/Posts/EditPost';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Subreddits />
        </Route>
        <ProtectedRoute path='/subreddits/new' exact={true} >
          <CreateSubreddit />
        </ProtectedRoute>
        <ProtectedRoute path='/subreddits/:id/edit' exact={true} >
          <EditSubreddit />
        </ProtectedRoute>
        <Route path='/subreddits/:id' exact={true} >
          <IndividualSubreddit />
        </Route>
        <Route path='/posts/:id' exact={true} >
          <IndividualPost />
        </Route>
        <ProtectedRoute path='/post/:id/edit' exact={true} >
          <EditPost />
        </ProtectedRoute>
        <ProtectedRoute path='/subreddit/post/new' exact={true} >
          <CreatePost />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

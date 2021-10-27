import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/Users/UsersList';
import User from './components/Users/User';
import { authenticate } from './store/session';
import CreateSubreddit from './components/Subreddits/CreateSubreddit';
import EditSubreddit from './components/Subreddits/EditSubreddit';
import IndividualSubreddit from './components/Subreddits/IndividualSubreddit';
import CreatePost from './components/Posts/CreatePost';
import IndividualPost from './components/Posts/IndividualPost';
import EditPost from './components/Posts/EditPost';
import BackButton from './components/NavBar/BackButton';
import CuratedFeed from './components/Posts/CuratedFeed';
import Results from './components/Results';
import SplashPage from './components/SplashPage';
import Footer from './components/Footer';
import Subreddits from './components/Subreddits';
import EditComment from './components/Comment/EditComment';
import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState('light')
  const dispatch = useDispatch();

  const user = useSelector((state) => (state.session.user))

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
    <div className={theme}>
      <BrowserRouter>
        <NavBar />
        <button 
          onClick={() => theme === 'light' ? setTheme('dark') : setTheme('light')}
          style={{position: "fixed", bottom:"15px", right: "15px", backgroundColor: "transparent", color: "var(--trimmings)"}}
          >{theme === 'light' ? "Dark Mode" : 'Light Mode'}
        </button>
        <BackButton />
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
            {user?.id ? <CuratedFeed /> : <SplashPage />}
          </Route>
          <ProtectedRoute path='/subreddits/new' exact={true} >
            <CreateSubreddit />
          </ProtectedRoute>
          <ProtectedRoute path='/subreddits/:id/edit' exact={true} >
            <EditSubreddit />
          </ProtectedRoute>
          <ProtectedRoute path='/subreddits/:id' exact={true} >
            <IndividualSubreddit />
          </ProtectedRoute>
          <ProtectedRoute path='/all/subreddits' exact={true} >
            <Subreddits />
          </ProtectedRoute>
          <ProtectedRoute path='/posts/:id' exact={true} >
            <IndividualPost />
          </ProtectedRoute>
          <ProtectedRoute path='/subreddits/search/:query' exact={true} >
            <Results />
          </ProtectedRoute>
          <ProtectedRoute path='/post/:id/edit' exact={true} >
            <EditPost />
          </ProtectedRoute>
          <ProtectedRoute path='/subreddit/post/new' exact={true} >
            <CreatePost />
          </ProtectedRoute>
          <ProtectedRoute path='/comments/:id/edit' exact={true} >
            <EditComment />
          </ProtectedRoute>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

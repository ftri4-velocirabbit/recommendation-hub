import React, { useState, useCallback, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import './App.scss';

import useModal from './../hooks/useModal';
import NavBar from './NavBar.jsx';
import Body from './Body.jsx';
import LandingPage from './LandingPage.jsx';
import Footer from './Footer.jsx';
import LoginModal from './../modals/LoginModal.jsx';
import RegisterModal from './../modals/RegisterModal.jsx';
import LogoutModal from './../modals/LogoutModal.jsx';

export default function App() {
  /* STATE */

  const [useLightTheme, setUseLightTheme] = useState(true);
  const [user, setUser] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [followers, setFollowers] = useState([]);

  // controlled COMPONENTS
  const [isOpenLoginModal, handleOpenLoginModal, handleCloseLoginModal] = useModal();
  const [loginModalError, setLoginModalError] = useState('');

  const [isRegisterModal, handleOpenRegisterModal, handleCloseRegisterModal] = useModal();
  const [registerModalError, setRegisterModalError] = useState('');

  const [isLogoutModal, handleOpenLogoutModal, handleCloseLogoutModal] = useModal();


  /* ACTIONS */

  useEffect(() => {
    // attempt to grab user info in case user has valid session cookie
    fetch('/api/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then(async (response) => {
      const body = await response.json();

      if (response.status !== 200) return; // user does not have a valid session

      setUser(body.user);
      setFollowedUsers(body.followedUsers);
      setFollowers(body.followers);
    });
  }, []);

  const handleLoginRequest = useCallback(async (username, password) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const body = await response.json();

    if (response.status === 401) {
      // invalid request, notify user
      return setLoginModalError(body.error);
    }

    if (response.status !== 200) {
      // unknown server error
      console.error(`Server responded to POST /login with status ${response.status}`);
      return console.error(body);
    }

    setUser(body.user);
    setFollowedUsers(body.followedUsers);
    setFollowers(body.followers);
    handleCloseLoginModal();
  }, [handleCloseLoginModal]);

  const handleRegisterRequest = useCallback(async (name, username, email, password) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password, email }),
    });
    const body = await response.json();

    if (response.status === 401) {
      // invalid request, notify user
      return setRegisterModalError(body.error);
    }

    if (response.status !== 200) {
      // unknown server error
      console.error(`Server responded to POST /api/user with status ${response.status}`);
      return console.error(body);
    }

    setUser(body.user);
    setFollowedUsers(body.followedUsers);
    setFollowers(body.followers);
    handleCloseRegisterModal();
  }, [handleCloseRegisterModal]);

  const handleLogoutRequest = useCallback(async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    });
    const body = await response.json();

    if (response.status !== 200) {
      // unknown server error
      console.error(`Server responded to POST /api/user with status ${response.status}`);
      return console.error(body);
    }

    setUser(null);
    handleCloseLogoutModal();
  }, [handleCloseLogoutModal]);


  /* RENDER */

  const theme = useTheme();
  theme.palette.mode = useLightTheme ? 'light' : 'dark';
  // STRETCH add light/dark mode button

  return (
    <div id='app'>
      <NavBar
        isLoggedIn={user !== null}
        handleOpenLoginModal={handleOpenLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
        handleOpenLogoutModal={handleOpenLogoutModal}
      />
      {!user && <LandingPage />}
      {user && <Body
        followers={followers}
        followedUsers={followedUsers}
        setUser={setUser}
        setFollowedUsers={setFollowedUsers}
      />}
      <Footer />

      <LoginModal
        isOpen={isOpenLoginModal}
        closeModal={handleCloseLoginModal}
        errorMessage={loginModalError}
        handleLoginRequest={handleLoginRequest}
      />
      <RegisterModal
        isOpen={isRegisterModal}
        closeModal={handleCloseRegisterModal}
        errorMessage={registerModalError}
        handleRegisterUser={handleRegisterRequest}
      />
      <LogoutModal
        isOpen={isLogoutModal}
        closeModal={handleCloseLogoutModal}
        handleLogoutRequest={handleLogoutRequest}
      />
    </div>
  );
}

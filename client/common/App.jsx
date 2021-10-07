import React, { useState, useCallback } from 'react';
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
  const [useLightTheme, setUseLightTheme] = useState(false);
  const [user, setUser] = useState(null); //null, useState({});

  // controlled COMPONENTS
  const [isOpenLoginModal, handleOpenLoginModal, handleCloseLoginModal] = useModal();
  const [loginModalError, setLoginModalError] = useState('');

  const [isRegisterModal, handleOpenRegisterModal, handleCloseRegisterModal] = useModal();
  const [registerModalError, setRegisterModalError] = useState('');

  const [isLogoutModal, handleOpenLogoutModal, handleCloseLogoutModal] = useModal();


  /* ACTIONS */
  const handleLoginRequest = useCallback((username, password) => {
    // TODO implement AJAX login handshake
  }, []);

  const handleRegisterRequest = useCallback((name, username, email, password) => {
    // TODO implement AJAX login handshake
  }, []);

  const handleLogoutRequest = useCallback(() => {
    // TODO implement AJAX login handshake
  }, []);

  /* Render */
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
      {user && <Body />}
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

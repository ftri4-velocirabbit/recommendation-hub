import React, { useState, useCallback } from 'react';

import './App.scss';
import useModal from './../hooks/useModal';

import { useTheme } from '@mui/material/styles';
import NavBar from './NavBar.jsx';
import LandingPage from './LandingPage.jsx';
import Footer from './Footer.jsx';
import LoginModal from './../modals/LoginModal.jsx';
import RegisterModal from './../modals/RegisterModal.jsx';

export default function App() {
  /* STATE */
  const [useLightTheme, setUseLightTheme] = useState(false);
  const [user, setUser] = useState(undefined);

  // controlled COMPONENTS
  const [isOpenLoginModal, handleOpenLoginModal, handleCloseLoginModal] = useModal();
  const [loginModalError, setLoginModalError] = useState('');

  const [isRegisterModal, handleOpenRegisterModal, handleCloseRegisterModal] = useModal();
  const [registerModalError, setRegisterModalError] = useState('');


  /* ACTIONS */
  const handleLoginRequest = useCallback(() => {
    // TODO implement AJAX login handshake
  }, []);

  const handleRegisterRequest = useCallback(() => {
    // TODO implement AJAX login handshake
  }, []);

  // TODO  handleRegisterUser(name, username, email, password1)

  /* Render */
  const theme = useTheme();
  theme.palette.mode = useLightTheme ? 'light' : 'dark';

  return (
    <>
      <div id='app'>
        <NavBar
          isLoggedIn={typeof user === 'object'}
          handleOpenLoginModal={handleOpenLoginModal}
          handleOpenRegisterModal={handleOpenRegisterModal}
        />
        {!user && <LandingPage />}
      </div>
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
    </>
  );
}

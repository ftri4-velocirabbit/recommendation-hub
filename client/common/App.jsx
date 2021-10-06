import React, { useState } from 'react';

import './App.scss';

import { useTheme } from '@mui/material/styles';
import NavBar from './NavBar.jsx';
import LandingPage from './LandingPage.jsx';
import Footer from './Footer.jsx';

export default function App() {
  const [useLightTheme, setUseLightTheme] = useState(false);
  const [user, setUser] = useState(undefined);

  const theme = useTheme();
  theme.palette.mode = useLightTheme ? 'light' : 'dark';

  return (
    <>
      <div id='app'>
        <NavBar isLoggedIn={typeof user === 'object'} />
        {!user && <LandingPage />}
      </div>
      <Footer />
    </>
  );
}

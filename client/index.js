import React from 'react';
import { render } from 'react-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';

import 'normalize.css';
import App from './common/App.jsx';

const theme = createTheme({});

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

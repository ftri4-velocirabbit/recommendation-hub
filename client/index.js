import React from 'react';
import { render } from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import 'normalize.css';
import './index.scss';
import App from './common/App.jsx';

// define colors.. styles
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#817f70',
      light: '#a39f97',
      contrastText: '#f3ebe4',
    },
    secondary: {
      main: '#c5a180',
    },
    background: {
      default: '#b5aa99',
      paper: '#f3ebe4',
    },
    text: {
      primary: '#2b2525',
      secondary: '#716462',
    },
    error: {
      main: '#967553',
      contrastText: '#f3ebe4',
    },
    warning: {
      main: '#9a846d',
      contrastText: '#f1ede3',
    },
    info: {
      main: '#9a846d',
      contrastText: '#f3ebe4',
    },
    success: {
      main: '#3d4235',
      contrastText: '#f1ede3',
    },
  },
  components: {
    MuiAppBar: {
      
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
  },
  typography: {
    fontFamily: 'Cormorant Garamond',
    cardHeader: {
    fontStyle: 'italic',
    },
    h6: {
      fontStyle: 'italic',
      },
  },
});

render(
  <ThemeProvider theme ={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

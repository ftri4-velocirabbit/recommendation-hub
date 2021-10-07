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
      main: '#985A1F',
      contrastText: '#f3ebe4',
    },
    warning: {
      main: '#985A1F',
      contrastText: '#f1ede3',
    },
    info: {
      main: '##904b04',
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
      color: '#904b04'
    },
    MuiInputLabel: {
      margin: 'dense',
      color: '#904b04'
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
      color: '#904b04'
    },
  },
  typography: {
    fontFamily: 'Cormorant Garamond',
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

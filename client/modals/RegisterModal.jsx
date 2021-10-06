import React, { useCallback, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTextField from '../hooks/useTextField.js';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

import usePasswordTextField from '../hooks/usePasswordTextField.js';

const { isValidName, isValidEmail, isValidPassword, isValidUsername } = require('../../shared/validation.js');

export default function SignUpModal({
  isOpen,
  closeModal,
  errorMessage,
  handleRegisterUser,
}) {
  /* STATE */

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [error, setError] = useState('');
  const [username, onUsernameChange] = useTextField('');
  const [name, onNameChange] = useTextField('');
  const [email, onEmailChange] = useTextField('');

  const [password1, showPassword1, onPasswordChange1, handleClickShowPassword1] = usePasswordTextField('');
  const [password2, showPassword2, onPasswordChange2, handleClickShowPassword2] = usePasswordTextField('');


  /* ACTION */

  const onSubmit = useCallback(() => {
    //conditionals, validation passes, then invoke handlRegisterUser, else change error state
    if (!isValidName(name)) return setError('Invalid Name: PLease omit numbers and special characters');
    if (!isValidUsername(username)) return setError('Username may only be word and digit characters without spaces.');
    if (!isValidEmail(email)) return setError('Invalid email address');
    if (password1 !== password2) return setError('Passwords don\'t match');
    if (!isValidPassword(password1)) return setError('Password must include upper-case, lower-case, number digit, and be at least 6 characters long');
    return handleRegisterUser(name, username, email, password1);
  }, [name, username, email, password1, password2, handleRegisterUser]);


  /* RENDER */

  const isNameValid = name.length === 0 || isValidName(name);
  const isUsernameValid = username.length === 0 || isValidUsername(username);
  const isEmailValid = email.length === 0 || isValidEmail(email);
  const isPassword1Valid = password1.length === 0 || isValidPassword(password1);
  const isPassword2Valid = password2.length === 0 || isValidPassword(password2);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle id="responsive-dialog-title">
        Sign Up
      </DialogTitle>
      <DialogContent>
        {(error.length > 0 || errorMessage.length > 0) &&
          <DialogContentText sx={{ color: 'error.main' }} >
            {error.length > 0 && error}
            {errorMessage.length > 0 && errorMessage}
          </DialogContentText>
        }

        <Stack
          component="form"
          noValidate
          autoComplete="off"
          spacing={3}
        >

          <FormControl
            error={!isNameValid}
            variant="standard"
          >
            <InputLabel htmlFor="name-field">Name</InputLabel>
            <Input
              id="name-field"
              aria-describedby="name-error-text"
              autoFocus
              value={name}
              onChange={onNameChange}
            />
            {!isNameValid && <FormHelperText id="name-error-text">Name must only be word characters without numbers</FormHelperText>}
          </FormControl>

          <FormControl
            error={!isUsernameValid}
            variant="standard"
          >
            <InputLabel htmlFor="username-field">Username</InputLabel>
            <Input
              id="username-field"
              aria-describedby="username-error-text"
              value={username}
              onChange={onUsernameChange}
            />
            {!isUsernameValid && <FormHelperText id="username-error-text">Username may only be word and digit characters without spaces</FormHelperText>}
          </FormControl>

          <FormControl
            error={!isEmailValid}
            variant="standard"
          >
            <InputLabel htmlFor="email-field">Email</InputLabel>
            <Input
              id="email-field"
              aria-describedby="email-error-text"
              value={email}
              onChange={onEmailChange}
            />
            {!isEmailValid && <FormHelperText id="email-error-text">Invalid email</FormHelperText>}
          </FormControl>

          <FormControl
            error={!isPassword1Valid}
            variant="standard"
          >
            <InputLabel htmlFor="password-field-1">Password</InputLabel>
            <Input
              id="password-field-1"
              variant="standard"
              type={showPassword1 ? 'text' : 'password'}
              value={password1}
              onChange={onPasswordChange1}
              aria-describedby="password-1-error-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                  >
                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!isPassword1Valid && <FormHelperText id="password-1-error-text">Password must include upper-case, lower-case, number digit, and be at least 6 characters long</FormHelperText>}
          </FormControl>

          <FormControl
            error={!isPassword2Valid}
            variant="standard"
          >
            <InputLabel htmlFor="password-field-2">Re-enter Password</InputLabel>
            <Input
              id="password-field-2"
              variant="standard"
              type={showPassword2 ? 'text' : 'password'}
              value={password2}
              onChange={onPasswordChange2}
              aria-describedby="password-2-error-text"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {!isPassword2Valid && <FormHelperText id="password-2-error-text">Password must include upper-case, lower-case, number digit, and be at least 6 characters long</FormHelperText>}
          </FormControl>

        </Stack>

      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit}>
          Submit
        </Button>
        <Button onClick={closeModal}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import React, { useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import useTextField from '../hooks/useTextField';
import usePasswordTextField from '../hooks/usePasswordTextField';

const { isValidEmail } = require('./../../shared/validation');

export default function LoginModal({
  isOpen,
  closeModal,
  errorMessage,
  handleLoginRequest
}) {
  /* STATE */

  const [email, onEmailChange] = useTextField('');
  const [password, showPassword, onPasswordChange, handleClickShowPassword] = usePasswordTextField('');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  /* ACTION */

  const handleSubmission = useCallback(() => {
    if (isValidEmail(email)) return handleLoginRequest(email, password);
  }, [handleLoginRequest, email, password]);


  /* RENDER */

  const isEmailValid = email.length === 0 || isValidEmail(email);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth='xs'
    >
      <DialogTitle id="responsive-dialog-title">
        Login
      </DialogTitle>
      <DialogContent>

        {errorMessage.length > 0 &&
          <DialogContentText
            sx={{ color: 'error.main' }}
          >{errorMessage}</DialogContentText>}

        <Stack
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            maxWidth: 360,
          }}
          spacing={2}
        >
          <FormControl
            error={!isEmailValid}
            variant="standard"
          >
            <InputLabel htmlFor="email-field">Email</InputLabel>
            <Input
              autoFocus
              id="email-field"
              aria-describedby="email-error-text"
              value={email}
              onChange={onEmailChange}
            />
            {!isEmailValid && <FormHelperText id="email-error-text">Invalid email</FormHelperText>}
          </FormControl>

          <FormControl variant="standard">
            <InputLabel htmlFor="password-field">Password</InputLabel>
            <Input
              id="password-field"
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={onPasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleSubmission}>
          Login
        </Button>
        <Button onClick={closeModal}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

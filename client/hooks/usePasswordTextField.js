import { useState, useCallback } from 'react';

/**
 * Custom hook to control a PasswordField component.
 * @returns `[password, showPassword, onPasswordChange, handleClickShowPassword]` 
 */
export default function usePasswordTextField(initialValue = '') {
  const [password, setPassword] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);

  const onPasswordChange = useCallback(event => {
    setPassword(event.target.value);
  }, []);

  const handleClickShowPassword = useCallback(event => {
    setShowPassword(state => !state);
    event.preventDefault();
  }, []);

  return [password, showPassword, onPasswordChange, handleClickShowPassword];
}

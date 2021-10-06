import React from 'react';

import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function LoginModal({
  isOpen,
  closeModal,
  handleLogoutRequest
}) {
  /* STATE */

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  /* RENDER */

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Logout
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          You will be returned to the landing page
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleLogoutRequest}>
          Logout
        </Button>
        <Button onClick={closeModal}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

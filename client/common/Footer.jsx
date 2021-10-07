import React from 'react';

import './Footer.scss';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {

  return (
    <Box id='footer' sx={{ bgcolor: '#817f70'}}>
      <Stack direction='row'>
        <Typography id='copywrite' sx={{ flexGrow: 1 }}>&copy; Recommendation&trade;</Typography>
        <Stack>
          <Button size='small'>About</Button>
          <Button size='small'>Terms of Service</Button>
          <Button size='small'>Privacy Notice</Button>
        </Stack>
      </Stack>
    </Box>
  );
}

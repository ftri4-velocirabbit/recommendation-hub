import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function SearchResult({
  users,
  followUser,
}) {
  return (
    <Stack spacing={2} mt={3}>
      {users.map(user => (
        <Stack key={user.username} direction='row'>
          <Typography mr={2}>{user.name}</Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => followUser(user.name, user.username)}
          >Follow</Button>
        </Stack>
      ))}
    </Stack>
  );
}

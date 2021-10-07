import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function SearchResult({
  users,
  followUser,
}) {
  return (
    <Stack>
      {users.map(user => (
        <Stack key={user.username}>
          <Typography>{user.name}</Typography>
          <Button variant="contained" onClick={() => followUser(user.name, user.username)}>Follow</Button>
        </Stack>
      ))}
    </Stack>
  );
}

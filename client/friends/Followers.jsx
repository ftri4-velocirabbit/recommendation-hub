import React from 'react';

import UserAvatar from './UserAvatar.jsx';

import Stack from '@mui/material/Stack';
import Typography from "@mui/material//Typography";

// remember to pass in props when uncommenting
export default function Followers({
  followers,
}) {

  return (
    <Stack direction="row" spacing={2} mt={4}>
      <Typography variant='h4' mb={2}>Followers</Typography>
      {followers.map(user =>
        <UserAvatar
          key={user.username}
          name={user.name}
          username={user.username}
          canUnfollow={false}
        />
      )}
    </Stack>
  );
}

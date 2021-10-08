import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function SearchResult({
  users,
  followedUsers,
  followUser,
  unfollowUser,
}) {
  return (
    <Stack spacing={2} mt={3}>
      {users.map(user => {
        const isFollowingUser = !!followedUsers.find(userItem => userItem.username === user.username);

        return (
          <Stack key={user.username} direction='row'>
            <Typography mr={2}>{user.name}</Typography>
            {!isFollowingUser && <Button
              variant="contained"
              size="small"
              onClick={() => followUser(user.name, user.username)}
            >Follow</Button>}
            {isFollowingUser && <Button
              variant="contained"
              size="small"
              onClick={() => unfollowUser(user.username)}
            >Unfollow</Button>}
          </Stack>
        );
      })}
    </Stack>
  );
}

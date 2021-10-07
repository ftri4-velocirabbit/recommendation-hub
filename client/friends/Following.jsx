import React from 'react';

import UserAvatar from './UserAvatar.jsx';
import './Following.scss';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material//Typography";

// remember to pass in props when uncommenting
export default function Following({
  followedUsers,
  unfollowUser,
}) {

  let followedAvatars = followedUsers.map(user =>
    <UserAvatar
      key={user.username}
      name={user.name}
      username={user.username}
      unfollowUser={unfollowUser}
      canUnfollow={true}
    />
  );

  
  return (
    <Stack direction="row" spacing={2} mt={4} >
      <Typography variant='h4' mb={2}>Following</Typography>
      <section id='followedAvatars'>
        {followedAvatars}
      </section>
    </Stack>
  );
}

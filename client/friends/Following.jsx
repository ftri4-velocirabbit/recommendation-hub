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
 
  return (
    <div>
      <Typography variant='h4' mb={2} mt={3}>Following</Typography>
      <Stack direction="row" spacing={2} mt={4} >
        <section id='followedAvatars'>
          {followedUsers.map(user =>
            <div className='avatarContainer'>
            <UserAvatar
              key={user.username}
              name={user.name}
              username={user.username}
              unfollowUser={unfollowUser}
              canUnfollow={true}
            />
            </div>
          )}
        </section>
      </Stack>
    </div>
  );
}

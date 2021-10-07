import React from 'react';

import UserAvatar from './UserAvatar.jsx';
import './Followers.scss';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material//Typography";

// remember to pass in props when uncommenting
export default function Followers({
  followers,
}) {



  return (
    <div>
      <Typography variant='h4' mb={2} mt={3}>Followers</Typography>
      <Stack direction="row" spacing={2} mt={4}>
        <section id='followersAvatars'>
          {followers.map(user =>
            <UserAvatar
              key={user.username}
              name={user.name}
              username={user.username}
              canUnfollow={false}
            />
          )}
        </section>
      </Stack>
    </div>
  );
}

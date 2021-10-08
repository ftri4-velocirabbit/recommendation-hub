import React, { useState, useCallback } from 'react';

import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Typography from "@mui/material//Typography";
import Button from "@mui/material//Button";


function getFirstWordLetters(string) {
  return string.match(/(^\w{1}|\s\w{1})/g).map(char => char.trim().toUpperCase()).join('');
}

export default function UserAvatar({
  name,
  username,
  unfollowUser,
  canUnfollow = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handleClose = useCallback(() => setAnchorEl(null), []);
  const onUnfollowClick = useCallback(() => unfollowUser(username), [unfollowUser, username]);

  const open = anchorEl !== null;

  return (
    <div className='user-avatar'>
      {/* TODO pick a random color per user */}
      <Avatar sx={{ bgcolor: '#F3ebe4' }}
        aria-owns={username + "-popover"}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {getFirstWordLetters(name)}
      </Avatar>
      <Popover
        id={username + "-popover"}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
      >
        <Typography sx={{ p: 1 }} >{name}</Typography>
        {canUnfollow && <Button  size="large" variant="contained" onClick={onUnfollowClick}>Unfollow</Button>}
      </Popover>
    </div>
  );
}

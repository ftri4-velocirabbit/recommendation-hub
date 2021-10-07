import React, { useState } from 'react';

import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Typography from "@mui/material//Typography";

function getFirstWordLetters(string) {
  return string.match(/(^\w{1}|\s\w{1})/g).map(char => char.trim().toUpperCase()).join('');
}

export default function UserAvatar({
  id,
  name,
}) {


  // TODO fix why id is not passed in


  const [anchorEl, setAnchorEl] = useState(null);
  const [userInfo, setUserInfo] = useState([]);





  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleUnfollow = (event) => {
    fetch(`/api/profile/${event.target.value}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        const followers = data.followedUser;
        setUserInfo(followers);
      });
  };



  const open = Boolean(anchorEl);


  return (
    <div>
      <Avatar sx={{ bgcolor: red[500] }}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        // onMouseEnter={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
        onClick={handleClick}
      >

        {getFirstWordLetters(name)}
        {/* TODO pick a random color per user */}
      </Avatar>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
      >

        {/* show user's name using {name} */}
        <Typography sx={{ p: 1 }} id={id}>{name} <br /><button className="newLine" onClick={handleUnfollow} value={id}>Unfollow</button></Typography>
      </Popover>
    </div>
  );
}


import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from "@mui/material//Typography";


function getFirstWordLetters(string) {
  return string.match(/(^\w{1}|\s\w{1})/g).map(char => char.trim().toUpperCase()).join('');
}

  export default function UserAvatar(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);


    //replace hard code 'Miguel Hernandez' with variable
    return (
      <div>
        <Avatar sx={{ bgcolor: red[500] }} 
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        // onMouseEnter={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
        onClick={handleClick}
        >
       
        {getFirstWordLetters(props.name)} 
        {/* TODO pick a random color per user */}
        </Avatar>
        <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={}
        disableRestoreFocus
        >

        {/* show user's name using {name} */}
      <Typography sx={{ p: 1 }}>This is user's full name. <br /><button className="newLine">Unfollow</button></Typography>  
      </Popover>
      </div>
    );
}


import React, {useState} from 'react';

import Popover from '@mui/material/Popover';

import './Friends.scss';

import Following from './Following.jsx';
import Followers from './Followers.jsx';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function Friends() {

  const followingArray = [{name: 'Jackie A', username: 'jackiea'}, {name: 'Jake B', username: 'jakb'}, {name: 'David Dohn', username: 'davidd'}];
    const friends = ['Miguel', 'Duke', 'Jacob', "Michael"]; // need to request from db.
    const [userInfo, setUserInfo] = useState({});

    // fetch('/api/user')
    // .then(res => res.json())
    // .then(data => setUserInfo(data));

    return (
      <div id="friends-container">
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={friends}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search People" />}
        />
      <Followers followers={userInfo.followers}/>
      <Following followedUsers={userInfo.followedUsers}/>
      </div>
    );
}
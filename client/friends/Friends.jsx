import React, { useState, useCallback } from 'react';

import './Friends.scss';

import Following from './Following.jsx';
import Followers from './Followers.jsx';

import TextField from '@mui/material/TextField';

export default function Friends({
  setUser,
}) {
  /* STATE */

  const [followedUsers, setFollowedUsers] = useState([]);
  const [followers, setFollowers] = useState([]);

  const [searchValue, setSearchValue] = useState('');
  const [userSearchResult, setUserSearchResult] = useState(null);


  /* ACTIONS */

  const onSearchValueChange = useCallback(event => {
    setSearchValue(event.target.value);

    // when user clears search field, display their follow/followers again
    if (event.target.value.length === 0) setUserSearchResult(null);
  }, []);

  const searchOnKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      if (searchValue.length > 0) {
        search(searchValue);
      }
      event.preventDefault();
    }
  }, [search, searchValue]);

  const search = useCallback(async (searchTerm) => {
    const response = await fetch('/api/search/' + encodeURIComponent(searchTerm), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    const body = await response.json();

    if (response.status === 401) {
      // User lost session
      return setUser(null);
    }

    if (response.status !== 200) {
      // unknown server error
      console.error(`Server responded to POST /login with status ${response.status}`);
      return console.error(body);
    }

    setUserSearchResult(body.users);
  }, [setUser]);


  /* RENDER */

  return (
    <div id="friends-container">
      <TextField
        label="Search People"
        value={searchValue}
        onChange={onSearchValueChange}
        onKeyPress={searchOnKeyPress}
      // todo add keypress controller
      />
      {!userSearchResult && <>
        <Followers followers={followers} />
        <Following followedUsers={followedUsers} />
      </>}
      {userSearchResult && <h1>TODO: Show results</h1>}
    </div>
  );
}

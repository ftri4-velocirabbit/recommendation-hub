import React, { useState, useCallback } from 'react';

import './Friends.scss';

import Following from './Following.jsx';
import Followers from './Followers.jsx';
import SearchResult from './SearchResult.jsx';

import TextField from '@mui/material/TextField';

export default function Friends({
  followers,
  followedUsers,
  setUser,
  setFollowedUsers,
  searchValue,
  setSearchValue,
}) {
  /* STATE */

  const [userSearchResult, setUserSearchResult] = useState(null);

  /* ACTIONS */

  const onSearchValueChange = useCallback(event => {
    setSearchValue(event.target.value);

    // when user clears search field, display their follow/followers again
    if (event.target.value.length === 0) setUserSearchResult(null);
  }, [setSearchValue]);

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
      console.error(`Server responded to GET /api/search/ with status ${response.status}`);
      return console.error(body);
    }

    setUserSearchResult(body.users);
  }, [setUser]);

  const followUser = useCallback(async (name, username) => {
    setFollowedUsers(followedUsers => {
      if (!followedUsers.find(user => user.username === username))
        return [...followedUsers, { name, username }];
      else
        return followedUsers;
    });

    const response = await fetch('/api/profile/' + encodeURIComponent(username), {
      method: 'POST',
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
      console.error(`Server responded to POST /api/profile/:username with status ${response.status}`);
      return console.error(body);
    }

    setFollowedUsers(body.followedUsers); // syncs with server when response comes in
  }, [setFollowedUsers, setUser]);

  const unfollowUser = useCallback(async (username) => {
    setFollowedUsers(followedUsers => followedUsers.filter(user => user.username !== username));

    const response = await fetch('/api/profile/' + encodeURIComponent(username), {
      method: 'DELETE',
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
      console.error(`Server responded to DELETE /api/profile/:username with status ${response.status}`);
      return console.error(body);
    }

    setFollowedUsers(body.followedUsers); // syncs with server when response comes in
  }, [setFollowedUsers, setUser]);


  /* RENDER */

  const showSearchResult = searchValue.length !== 0 && userSearchResult !== null;

  return (
    <div id="friends-container">
      <TextField
        label="Search people..."
        value={searchValue}
        onChange={onSearchValueChange}
        onKeyPress={searchOnKeyPress}
        size="small"
        color="warning"
        sx={{color:'warning.main'}}
      />
      {!showSearchResult && <>
        <Followers
          followers={followers}
        />
        <Following
          followedUsers={followedUsers}
          unfollowUser={unfollowUser}
        />
      </>}
      {showSearchResult && <SearchResult
        users={userSearchResult}
        followUser={followUser}
      />}
    </div>
  );
}

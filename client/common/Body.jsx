import React, { useState, useCallback } from 'react';

import './Body.scss';

import VerticalNavBar from './VerticalNavBar.jsx';
import Feed from './../feed/Feed.jsx';
import Settings from '../settings/Settings.jsx';
import MyRecommendation from './../my_recommendation/MyRecommendation.jsx';
import Friends from './../friends/Friends.jsx';

import Stack from '@mui/material/Stack';

export default function Body({
  followers,
  followedUsers,
  setUser,
  setFollowedUsers,
}) {
  const [page, setPage] = useState('feed');
  const [searchValue, setSearchValue] = useState('');

  const onPageNav = useCallback(page => {
    setSearchValue('');
    setPage(page);
  }, []);

  return (
    <Stack id='body' direction='row'>
      <VerticalNavBar setPage={onPageNav} />
      {page === 'feed' && <Feed setUser={setUser} />}
      {page === 'recommendations' && <MyRecommendation setUser={setUser} />}
      {page === 'friends' && <Friends
        followers={followers}
        followedUsers={followedUsers}
        setUser={setUser}
        setFollowedUsers={setFollowedUsers}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />}
      {page === 'settings' && <Settings setUser={setUser} />}
    </Stack>
  );
}

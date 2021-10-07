import React, { useState } from 'react';

import './Body.scss';

import VerticalNavBar from './VerticalNavBar.jsx';
import Feed from './../feed/Feed.jsx';
import Settings from '../settings/Settings.jsx';
import MyRecommendation from './../my_recommendation/MyRecommendation.jsx';
import Friends from './../friends/Friends.jsx';

import Stack from '@mui/material/Stack';

export default function Body() {
  const [page, setPage] = useState('feed');

  return (
    <Stack id='body' direction='row'>
      <VerticalNavBar setPage={setPage} />
      {page === 'feed' && <Feed />}
      {page === 'recommendations' && <MyRecommendation />}
      {page === 'friends' && <Friends />}
      {page === 'settings' && <Settings />}
    </Stack>
  );
}

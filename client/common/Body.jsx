import * as React from 'react';

import './Body.scss';

import VerticalNavBar from './VerticalNavBar.jsx';
import Feed from './../feed/Feed.jsx';
import MyRecommendation from './../my_recommendation/MyRecommendation.jsx';

import Stack from '@mui/material/Stack';

export default function Body() {
  return (
    <Stack id='body' direction='row'>
      <VerticalNavBar />
      <Feed />
    </Stack>
  );
}

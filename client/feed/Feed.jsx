import React, { useState, useEffect } from 'react';

import './Feed.scss';
import FeedRecommendation from './FeedRecommendation.jsx';

import Stack from '@mui/material/Stack';

export default function Feed() {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {

    // TODO ajax request for recommendations

    setRecommendations([
      {
        id: 1,
        title: 'Favorite movie',
        body: 'Titanic maybe?',
        rating: 4,
        category: 'Movies',
        date: new Date(),
        owner: {
          name: 'Miguel Hernandez',
          username: 'miguel'
        }
      },
      {
        id: 2,
        title: 'Worst movie',
        body: 'Some scary movie',
        rating: 0,
        category: 'Movies',
        date: new Date(),
        owner: {
          name: 'Miguel Hernandez',
          username: 'miguel'
        }
      },
    ]);
  }, []); // todo no array, so it will be called on each component render

  return (
    <Stack id='feed' spacing={5}>
      {recommendations && recommendations.map(rec => <FeedRecommendation key={rec.id} recommendation={rec} />)}
    </Stack>
  );
}

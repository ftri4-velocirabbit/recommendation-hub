import React, { useState, useEffect } from 'react';

import './Feed.scss';
import RecommendationCard from './../common/RecommendationCard.jsx';

import Stack from '@mui/material/Stack';

export default function Feed({
  setUser,
}) {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    fetch('/api/feed', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then(async (response) => {
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

      setRecommendations(body.recommendations);
    });
  }, [setUser]);

  return (
    <Stack id='feed' spacing={5}>
      {recommendations && recommendations.map(rec => <RecommendationCard key={rec.id} recommendation={rec} />)}
    </Stack>
  );
}

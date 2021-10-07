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

      setRecommendations(body.recommendations.map(rec => {
        // convert date to JS date objects
        rec.date = new Date(rec.date);
        return rec;
      }));
    });
  }, [setUser]);

  // Sort feed in reverse chronological order
  if (recommendations) recommendations.sort((recA, recB) => recB.date - recA.date);

  return (
    <Stack id='feed' spacing={5}>
      {recommendations && recommendations.map(rec => <RecommendationCard key={rec.id} recommendation={rec} />)}
    </Stack>
  );
}

import React, { useState, useEffect, useCallback } from 'react';

import './MyRecommendation.scss';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const categories = require('./../../shared/categories.json');
import CategoryAccordion from './CategoryAccordion.jsx';

export default function MyRecommendation({
  setUser,
}) {
  const [recommendations, setRecommendations] = useState(null);

  console.log({ recommendations }); // ! remove 

  useEffect(() => {
    fetch('/api/recommendation', {
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
        console.error(`Server responded to GET /api/recommendation with status ${response.status}`);
        return console.error(body);
      }

      // parse recommendations sorted into recommendations by category
      setRecommendations(categories.reduce((recObj, category) => {
        recObj[category] = body.recommendations.find(rec => rec, category === category);
        return recObj;
      }, Object.create(null)));
    });
  }, [setUser]);

  const handleNewRecommendation = useCallback((title, body, category, rating) => {
    console.log('new rec handler');
    console.log({ title, body, category, rating });
    // todo AJAX
  }, []);

  return (
    <Stack id='my-recommendation'>
      <Typography variant='h4' mt={3} ml={1} mb={2}>Select a category</Typography>
      {categories.map(category => <CategoryAccordion
        key={category}
        category={category}
        recommendations={recommendations && recommendations[category]}
        handleNewRecommendation={handleNewRecommendation}
      />)}
    </Stack>
  );
}

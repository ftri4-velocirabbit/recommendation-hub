import React, { useState, useEffect } from 'react';

import './MyRecommendation.scss';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const categories = require('./../../shared/categories.json');
import CategoryAccordion from './CategoryAccordion.jsx';

export default function MyRecommendation() {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    // TODO handle ajax requests

    // parse recommendations sorted into recommendations by category

    setRecommendations({
      'Movies': [
        {
          id: 1,
          title: 'Favorite movie',
          body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Suspendisse
          malesuada lacus ex, sit amet blandit leo `,
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
        {
          id: 3,
          title: 'Worst movie',
          body: 'Some scary movie',
          rating: 0,
          category: 'Movies',
          date: new Date(),
          owner: {
            name: 'Miguel Hernandez',
            username: 'miguel'
          }
        }
      ]
    });
  }, []);

  return (
    <Stack id='my-recommendation'>
      <Typography variant='h4' mt={3} ml={1} mb={2}>Select a category</Typography>
      {categories.map(category => <CategoryAccordion key={category} category={category} recommendations={recommendations && recommendations[category]} />)}
    </Stack>
  );
}

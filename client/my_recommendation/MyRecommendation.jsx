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
        recObj[category] = body.recommendations.filter(rec => rec.category === category);
        return recObj;
      }, Object.create(null)));
    });
  }, [setUser]);

  const handleNewRecommendation = useCallback(async (title, body, category, rating) => {
    const response = await fetch('/api/recommendation', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category, rating }),
    });
    const responseBody = await response.json();

    if (response.status === 401) {
      // User lost session
      return setUser(null);
    }

    if (response.status !== 200) {
      // unknown server error
      console.error(`Server responded to POST /api/recommendation/ with status ${response.status}`);
      return console.error(responseBody);
    }

    // parse recommendations sorted into recommendations by category
    setRecommendations(categories.reduce((recObj, category) => {
      recObj[category] = responseBody.recommendations.filter(rec => rec.category === category);
      return recObj;
    }, Object.create(null)));
  }, [setUser]);

  const submitUpdateRecommendation = useCallback(async (id, title, body, category, rating) => {
    const response = await fetch('/api/recommendation/' + encodeURIComponent(id), {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category, rating }),
    });
    const responseBody = await response.json();

    if (response.status === 401) {
      // User lost session
      return setUser(null);
    }

    if (response.status !== 200) {
      // unknown server error
      console.error(`Server responded to PATCH /api/recommendation/:id with status ${response.status}`);
      return console.error(responseBody);
    }

    // parse recommendations sorted into recommendations by category
    setRecommendations(categories.reduce((recObj, category) => {
      recObj[category] = responseBody.recommendations.filter(rec => rec.category === category);
      return recObj;
    }, Object.create(null)));
  }, [setUser]);

  const submitDeleteRecommendation = useCallback(async (id, title, body, category, rating) => {
    const response = await fetch('/api/recommendation/' + encodeURIComponent(id), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });
    const responseBody = await response.json();

    if (response.status === 401) {
      // User lost session
      return setUser(null);
    }

    if (response.status !== 200) {
      // unknown server error
      console.error(`Server responded to DELETE /api/recommendation/:id with status ${response.status}`);
      return console.error(responseBody);
    }

    // parse recommendations sorted into recommendations by category
    setRecommendations(categories.reduce((recObj, category) => {
      recObj[category] = responseBody.recommendations.filter(rec => rec.category === category);
      return recObj;
    }, Object.create(null)));
  }, [setUser]);

  return (
    <Stack id='my-recommendation'>
      <Typography variant='h4' mt={3} ml={1} mb={2}>Select a category</Typography>
      {categories.map(category => <CategoryAccordion
        key={category}
        category={category}
        recommendations={recommendations && recommendations[category]}
        handleNewRecommendation={handleNewRecommendation}
        submitUpdateRecommendation={submitUpdateRecommendation}
        submitDeleteRecommendation={submitDeleteRecommendation}
      />)}
    </Stack>
  );
}

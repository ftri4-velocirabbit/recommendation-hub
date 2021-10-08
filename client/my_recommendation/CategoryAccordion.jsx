import React, { useState, useCallback } from 'react';

import './CategoryAccordion.scss';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import RecommendationCard from './../common/RecommendationCard.jsx';


export default function CategoryAccordion({
  category,
  recommendations,
  handleNewRecommendation,
  submitUpdateRecommendation,
  submitDeleteRecommendation,
}) {
  const [isAddingNewRec, setIsAddingNewRec] = useState(false);

  const cancelEditing = useCallback(() => setIsAddingNewRec(false), []);
  const submitNewRecommendation = useCallback((title, body, category, rating) => {
    handleNewRecommendation(title, body, category, rating);
    setIsAddingNewRec(false);
  }, [handleNewRecommendation]);

  const id = category + '-accordion';

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={id}
        id={id}
      >
        <Typography variant='h6' ml={1}>{category}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {!isAddingNewRec && <Button onClick={() => setIsAddingNewRec(true)}>Add <AddIcon /></Button>}
        <Stack className='accordion-stack' spacing={5}>
          {isAddingNewRec && <RecommendationCard
            recommendation={{ title: '', body: '', rating: 5, category, owner: {} }}
            isEditable={true}
            openEditing={true}
            cancelEditing={cancelEditing}
            submitNewRecommendation={submitNewRecommendation}
          />}
          {recommendations && recommendations.map(rec => <RecommendationCard
            key={rec.id}
            recommendation={rec}
            isEditable={true}
            cancelEditing={cancelEditing}
            submitUpdateRecommendation={submitUpdateRecommendation}
            submitDeleteRecommendation={submitDeleteRecommendation}
          />)
          }
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

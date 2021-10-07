import React from 'react';

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

export default function CategoryAccordion({ category, recommendations }) {
	const id = category + '-accordion';

	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={id} id={id}>
				<Typography variant='h6' ml={1}>
					{category}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Button>
					Add <AddIcon />
				</Button>
				{recommendations && (
					<Stack className='accordion-stack' spacing={5}>
						{recommendations.map((rec) => (
							<RecommendationCard key={rec.id} recommendation={rec} isEditable={true} />
						))}
					</Stack>
				)}
			</AccordionDetails>
		</Accordion>
	);
}

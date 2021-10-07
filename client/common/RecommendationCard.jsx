import React from 'react';

import './RecommendationCard.scss';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';

function getFirstWordLetters(string) {
  return string.match(/(^\w{1}|\s\w{1})/g).map(char => char.trim().toUpperCase()).join('');
}

export default function RecommendationCard({
  isEditable = false,
  recommendation: { id, title, body, rating, category, date, owner: { name, username } }
}) {
  // TODO add modal to unfollow user when clicking on Avatar

  // TODO add ability to edit recommendation

  // STRETCH add like button functionality

  return (
    <Card className='feed-recommendation'>
      <Stack className='feed-recommendation-header'>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }}>
              {getFirstWordLetters(name)}
              {/* TODO pick a random color per user */}
            </Avatar>
          }
          title={name}
          subheader={date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
        />
        <Typography variant="h6" color="text.primary" align="right">{category}</Typography>
        <CardActions disableSpacing>
          {!isEditable && <IconButton aria-label="heart this">
            <FavoriteIcon />
          </IconButton>}
          {isEditable && <IconButton aria-label="edit recommendation">
            <EditIcon />
          </IconButton>}
        </CardActions>
      </Stack>
      <CardContent>
        <Typography variant="h6" color="text.secondary">{title}</Typography>
        <Typography variant="body1" color="text.secondary">{body}</Typography>
      </CardContent>
    </Card>
  );
}

import React, { useState, useCallback } from 'react';

import './RecommendationCard.scss';
import categories from '../../shared/categories.json';
import useTextField from './../hooks/useTextField';

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
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function getFirstWordLetters(string) {
  return string.match(/(^\w{1}|\s\w{1})/g).map(char => char.trim().toUpperCase()).join('');
}

export default function RecommendationCard({
  recommendation: { id, title, body, rating, category, date, owner: { name, username } },
  isEditable = false,
  openEditing = false,
  cancelEditing,
  submitNewRecommendation,
}) {
  // STRETCH add like button functionality
  // TODO add modal to unfollow user when clicking on Avatar

  /* STATE */

  const [isEditing, setIsEditing] = useState(openEditing);
  const [titleFieldValue, onTitleFieldValue] = useTextField();
  const [bodyFieldValue, onBodyFieldValue] = useTextField();
  const [categoryFieldValue, onCategoryFieldValue] = useTextField(category);


  /* ACTIONS */

  const handleEdit = useCallback(() => {
    // close modal instead of
    setIsEditing(isEditing => !isEditing);
  }, []);

  const handleSaveSubmit = useCallback((event) => {
    event.preventDefault();

    // TODO implement rating and editing of rating
    submitNewRecommendation(titleFieldValue, bodyFieldValue, categoryFieldValue, rating);
  }, [bodyFieldValue, categoryFieldValue, rating, submitNewRecommendation, titleFieldValue]);


  /* RENDER */

  return (
    <Card className='feed-recommendation'>
      <Stack className='feed-recommendation-header'>
        {!isEditing && <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#817f70'}}>
              {getFirstWordLetters(name)}
              {/* TODO pick a random color per user */}
            </Avatar>
          }
          // sx={{ typography: 'cardHeader' }}
          title={name}
          subheader={new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
        />}
        {/* <Typography variant="h6" color="text.primary" align="right">{category}</Typography> */}
        {!isEditable && <Typography variant="h6" color="text.primary" align="right">{category}</Typography>}
        {isEditable && !isEditing && <Typography variant="h6" color="text.primary" align="right">{category}</Typography>}
        {isEditable && isEditing &&
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="recommendation-edit-category">Category</InputLabel>
            <Select
              labelId="recommendation-edit-category"
              value={categoryFieldValue}
              onChange={onCategoryFieldValue}
              autoWidth
              label="Category"
            >
              {categories.map(category =>
                <MenuItem key={category} value={category}>{category}</MenuItem>
              )}
            </Select>
          </FormControl>
        }
        <CardActions disableSpacing>
          {!isEditable && <IconButton aria-label="heart this">
            <FavoriteIcon />
          </IconButton>}
          {isEditable && !openEditing && <IconButton aria-label="edit recommendation" onClick={handleEdit}>
            <EditIcon />
          </IconButton>}
        </CardActions>
      </Stack>
      <CardContent>
        {!isEditable && <div>
          <Typography variant="h6" color="text.secondary">{title}</Typography>
          <Typography variant="body1" color="text.secondary">{body}</Typography>
        </div>}

        {isEditable && !isEditing && <div>
          <Typography variant="h6" color="text.secondary">{title}</Typography>
          <Typography variant="body1" color="text.secondary">{body}</Typography>
        </div>}

        {isEditable && isEditing && <div>
          <form onSubmit={handleSaveSubmit}>
            <InputLabel htmlFor="my-title">Title</InputLabel>
            <TextField
              id="my-title"
              variant="outlined"
              aria-describedby="my-title"
              defaultValue={titleFieldValue}
              onChange={onTitleFieldValue}
            />
            <InputLabel htmlFor="my-recommendation">Recommendation</InputLabel>
            <TextField
              id="my-recommendation"
              fullWidth={true}
              variant="outlined"
              multiline
              maxRows={4}
              aria-describedby="my-recommendation"
              defaultValue={bodyFieldValue}
              onChange={onBodyFieldValue}
            />
            <Button type="submit" variant="outlined" onClick={handleSaveSubmit}>Save</Button>
            <Button variant="outlined" color="error" onClick={cancelEditing}>Cancel</Button>
          </form>
        </div>}
      </CardContent>
    </Card>
  );
}

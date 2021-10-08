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
  recommendation: { id, title, body, rating, category, date, owner: { name } },
  isEditable = false,
  openEditing = false,
  cancelEditing,
  submitNewRecommendation,
  submitUpdateRecommendation,
  submitDeleteRecommendation,
}) {
  // STRETCH add like button functionality
  // TODO add modal to unfollow user when clicking on Avatar

  /* STATE */

  const [isEditing, setIsEditing] = useState(openEditing);
  const [titleFieldValue, onTitleFieldValue] = useTextField(title);
  const [bodyFieldValue, onBodyFieldValue] = useTextField(body);
  const [categoryFieldValue, onCategoryFieldValue] = useTextField(category);


  /* ACTIONS */

  const handleEdit = useCallback(() => {
    // close modal instead of
    setIsEditing(isEditing => !isEditing);
  }, []);

  const handleSaveSubmit = useCallback((event) => {
    event.preventDefault();

    // TODO implement rating and editing of rating
    if (openEditing) return submitNewRecommendation(titleFieldValue, bodyFieldValue, categoryFieldValue, rating);
    setIsEditing(false);
    return submitUpdateRecommendation(id, titleFieldValue, bodyFieldValue, categoryFieldValue, rating);
  }, [bodyFieldValue, categoryFieldValue, id, openEditing, rating, submitNewRecommendation, submitUpdateRecommendation, titleFieldValue]);

  const handleDelete = useCallback(() => {
    setIsEditing(false);
    submitDeleteRecommendation(id);
  }, [id, submitDeleteRecommendation]);

  const handleCancel = useCallback(() => {
    if (openEditing) return cancelEditing();
    setIsEditing(false);
  }, [cancelEditing, openEditing]);


  /* RENDER */

  return (
    <Card className='feed-recommendation'>
      <Stack className='feed-recommendation-header'>
        {!isEditing && <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#817f70' }}>
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
          {isEditable && !openEditing && !isEditing && <IconButton aria-label="edit recommendation" onClick={handleEdit}>
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
            <Stack spacing={2}>
              <TextField
                id="my-title"
                variant="outlined"
                label="Title"
                aria-describedby="my-title"
                defaultValue={titleFieldValue}
                onChange={onTitleFieldValue}
              />
              <TextField
                id="my-recommendation"
                fullWidth={true}
                variant="outlined"
                label="Recommendation"
                multiline
                maxRows={4}
                aria-describedby="my-recommendation"
                defaultValue={bodyFieldValue}
                onChange={onBodyFieldValue}
              />
            </Stack>
            <Stack className="recommendation-buttons-nav" direction="row" mt={2}>
              <Button type="submit" variant="contained" size='small' onClick={handleSaveSubmit}>Save</Button>
              <Button variant="contained" color="error" size='small' onClick={handleCancel}>Cancel</Button>
              {!openEditing && <Button variant="contained" color="error" size='small' onClick={handleDelete}>Delete</Button>}
            </Stack>
          </form>
        </div>}
      </CardContent>
    </Card>
  );
}

import React, { useState } from 'react';

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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

function getFirstWordLetters(string) {
  return string.match(/(^\w{1}|\s\w{1})/g).map(char => char.trim().toUpperCase()).join('');
}

export default function RecommendationCard({
  isEditable = false,
  openEditing = false,
  recommendation: { id, title, body, rating, category, date, owner: { name, username } },
}) {
  // TODO add modal to unfollow user when clicking on Avatar

  const [isEditing, setIsEditing] = useState(openEditing);
  function handleEdit() {
    setIsEditing(!isEditing);
    return;
  }

  const [titleFieldValue, onTitleFieldValue] = useTextField();
  const [bodyFieldValue, onBodyFieldValue] = useTextField();

  function handleSubmit(event) {
    const updatedRec = {
      title: titleFieldValue,
      body: bodyFieldValue,
    };
    console.log('updatedRec', updatedRec);
    event.preventDefault();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  // STRETCH add like button functionality

  /* RENDER */

  const categoriesMenuList = [];
  for (let category of categories) {
    categoriesMenuList.push(<MenuItem key={category} onClick={() => { console.log(category); handleClose(); }}>{category}</MenuItem>);
  }

  const open = Boolean(anchorEl);

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
          subheader={new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
        />
        {/* <Typography variant="h6" color="text.primary" align="right">{category}</Typography> */}
        {!isEditable && <Typography variant="h6" color="text.primary" align="right">{category}</Typography>}
        {isEditable && !isEditing && <Typography variant="h6" color="text.primary" align="right">{category}</Typography>}
        {isEditable && isEditing &&
          <div>
            <Button
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              defaultValue={title}
              onClick={handleClick}
            >
              {category}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              {categoriesMenuList}
            </Menu>
          </div>}
        <CardActions disableSpacing>
          {!isEditable && <IconButton aria-label="heart this">
            <FavoriteIcon />
          </IconButton>}
          {isEditable && <IconButton aria-label="edit recommendation" onClick={handleEdit}>
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
          <form onSubmit={handleSubmit}>
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
            <Button type="submit">Save</Button>
          </form>
        </div>}
      </CardContent>
    </Card>
  );
}

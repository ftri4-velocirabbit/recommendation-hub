import React, {useState} from 'react';

import './RecommendationCard.scss';
import categories from '../../shared/categories.json';

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
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

function getFirstWordLetters(string) {
  return string.match(/(^\w{1}|\s\w{1})/g).map(char => char.trim().toUpperCase()).join('');
}

export default function RecommendationCard({
  isEditable = false,
  recommendation: { id, title, body, rating, category, date, owner: { name, username } }
}) {
  // TODO add modal to unfollow user when clicking on Avatar

  // TODO add ability to edit recommendation
  const [edit, setEdit] = useState(false);
  function handleEdit () {
    setEdit(!edit);
    return;
  }

  const [titleState, setTitleState] = useState(title);
  const [bodyState, setBodyState] = useState(body);
  function handleSubmit (e) {
    e.preventDefault();
    const updatedRec = {
      title: titleState,
      body: bodyState,
    };
    console.log('updatedRec', updatedRec);
    return;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const categoriesMenuList = [];
  for (let category of categories) {
    categoriesMenuList.push(<MenuItem key={category} onClick={() => {console.log(category); handleClose();}}>{category}</MenuItem>);
  }

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
        {/* <Typography variant="h6" color="text.primary" align="right">{category}</Typography> */}
        {!isEditable && <Typography variant="h6" color="text.primary" align="right">{category}</Typography>}
        {isEditable && !edit && <Typography variant="h6" color="text.primary" align="right">{category}</Typography>}
        {isEditable && edit && 
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
        {/* <Typography variant="h6" color="text.secondary">{title}</Typography> */}
        {/* <Typography variant="body1" color="text.secondary">{body}</Typography> */}

        {!isEditable && <div>
          <Typography variant="h6" color="text.secondary">{title}</Typography>
          <Typography variant="body1" color="text.secondary">{body}</Typography>
        </div>}
        {isEditable && !edit && <div>
          <Typography variant="h6" color="text.secondary">{title}</Typography>
          <Typography variant="body1" color="text.secondary">{body}</Typography>
        </div>}
        {isEditable && edit && <div>

          <form onSubmit={handleSubmit}>
            
            <InputLabel htmlFor="my-title">Title</InputLabel>
            <TextField id="my-title" variant="outlined" aria-describedby="my-title" defaultValue={title} onChange={e => setTitleState(e.target.value)}/>
            <InputLabel htmlFor="my-recommendation">Recommendation</InputLabel>
            <TextField id="my-recommendation" fullWidth={true} variant="outlined" multiline
              maxRows={4} aria-describedby="my-recommendation" defaultValue={body} onChange={e => setBodyState(e.target.value)}/>
            <Button type="submit">Save</Button>
          </form>
        </div>}


      </CardContent>
    </Card>
  );
}

import React from 'react';

import './LandingPage.scss';

import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function LandingPage() {
  return (
    <>
      <h1>Hi, this is Landing Page.</h1>
      <Paper id='landing-container' elevation={3}>Inside paper.
        <Card sx={{ maxWidth: 445 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200917151634-national-cheeseburger-day-2020-stock.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>
    </>
  );
}

// need to style:
// .MuiCard-root
// .MuiPaper-root


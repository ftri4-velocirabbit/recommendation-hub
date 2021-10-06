import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../common/LandingPage.scss';
import Pagination from '@mui/material/Pagination';
import handleChange from './CarouselItem.jsx';


export default function CarouselItem({
  caption,
  imageUrl,
  page,
  handleChange
}) {
  return(
    
    // <Card sx={{ maxWidth: 445 }}>
    //     <CardActionArea>
    //       <CardMedia
    //         component="img"
    //         height="200"
    //         image={imageUrl}
    //         alt="green iguana"
    //       />
    //       <CardContent>
    //       <Typography gutterBottom variant="h5" component="div">
    //             {caption}
    //       </Typography>
    //       {/* <Typography variant="body2" color="text.secondary">
    //             Lizards are a widespread group of squamate reptiles, with over 6,000
    //             species, ranging across all continents except Antarctica
    //       </Typography> */}
    //       </CardContent>
    //     </CardActionArea>
    // </Card>

    // <div className="mySlides fade">
    <div>
    <img src={imageUrl} style={{width:600, height: 300}}/>
    <div className="text">{caption}</div>

    </div>
  );

}
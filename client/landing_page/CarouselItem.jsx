import React from 'react';
import './LandingPageFeature.scss';

export default function CarouselItem({
  caption,
  imageUrl,
}) {
  return(
    <div className="carouselItem">
    <img src={imageUrl} style={{width:600, height: 300}}/>
    <div className="text">{caption}</div>
    </div>
  );

}
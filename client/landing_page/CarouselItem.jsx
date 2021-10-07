import React from 'react';
import '../common/LandingPage.scss';

export default function CarouselItem({
  caption,
  imageUrl,
}) {
  return(
    <div>
    <img src={imageUrl} style={{width:600, height: 300}}/>
    <div className="text">{caption}</div>
    </div>
  );

}
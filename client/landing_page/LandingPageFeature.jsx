import React, { useState, useEffect, useCallback } from 'react';

import './LandingPageFeature.scss';

import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

import CarouselItem from './CarouselItem.jsx';

const slides = [
  {
    caption: "Find recommendations based on your interests!",
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6991e060-2384-4a9a-a7b5-4ad5bf84a978/dcdhzqj-738d5406-eea3-4693-8ad5-5a0b403dd8c1.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzY5OTFlMDYwLTIzODQtNGE5YS1hN2I1LTRhZDViZjg0YTk3OFwvZGNkaHpxai03MzhkNTQwNi1lZWEzLTQ2OTMtOGFkNS01YTBiNDAzZGQ4YzEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.S8GGgxeqoQJmjArLWSeyXTmNMEwBn5xKifakrT2X38g",
    page: 0
  },
  {
    caption: "View all recommendations from people you follow.",
    image: "https://i.pinimg.com/564x/d1/91/53/d19153b53d71a6a0a9493440680947ed.jpg",
    page: 1
  },
  {
    caption: "Share recommendations with your friends!",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3wvibFC1J57VFUw-c5gS8w2HeLEgUna5kA&usqp=CAU",
    page: 2
  },
  {
    caption: "Widen your horizon.",
    image: "https://i.pinimg.com/564x/2c/a9/5b/2ca95b3cd1b6a3d80fcf506dac0da9f9.jpg",
    page: 3
  },
  {
    caption: "Allow yourself to grow.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFL4vBsgCU9zGJBFmS_6gQSwVsssWt7KOApA&usqp=CAU",
    page: 4
  }
];

export default function LandingPageFeature() {
  const [carouselPageNum, setCarouselPageNum] = useState(1);

  /* changes slides at set time interval */
  useEffect(() => {
    const intervalId = setInterval(() => {
      // switch logic
      // iterate through slides array
      // set each element of array as new state
      // change the state of LandingPageFeature
      setCarouselPageNum(num => {
        num++;
        if (num > slides.length) num = 1;
        return num;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (event, pageNum) => {
    setCarouselPageNum(pageNum);
  };

  /* change slides */
  // TODO reset interval timer if use clicks on a button
  // TODO fix to allow overlapping left and right movement
  const switchSlide = useCallback((n) => {
    //console.log('clicked', n);
    // setCarouselPageNum(num => num + n);
    setCarouselPageNum(num => {
      num += n;
      if (num > slides.length) num -= 1;
      if (num < 1) num = 1;
      return num;
    });
  }, []);

  return (
    <>
      <Paper id='landing-container' elevation={10}>
        <a className="prev" onClick={() => switchSlide(-1)}>&#10094;</a>
        <CarouselItem
          caption={slides[carouselPageNum - 1].caption}
          imageUrl={slides[carouselPageNum - 1].image}
        />
        <a className="next" onClick={() => switchSlide(1)}>&#10095;</a>
        <Pagination count={slides.length} variant="outlined" page={carouselPageNum} hidePrevButton hideNextButton onChange={handleChange} />
      </Paper>
    </>
  );
}

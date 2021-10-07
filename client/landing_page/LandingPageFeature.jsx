import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import CarouselItem from './CarouselItem.jsx';
import '../common/LandingPage.scss';
import { useCallback } from 'react';
import Pagination from '@mui/material/Pagination';

const slides = [
  {
    caption: "incredible promotional message",
    image: "https://www.jahangeer.com/wp-content/uploads/2014/12/2400x780_Movie2014Banner.jpg",
    page: 0
  },
  {
    caption: "inspiring marketing motto",
    image: "https://eugenspivak.com/wp-content/uploads/2020/05/Book-Marketing-Tips-How-to-Increase-Book-Sales-From-Multi-Award-Winning-Author.jpg",
    page: 1
  },
  {
    caption: "cheeseburgers sell themselves",
    image: "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200917151634-national-cheeseburger-day-2020-stock.jpg",
    page: 2
  },
  {
    caption: "award winning music",
    image: "https://thumbs.dreamstime.com/b/neon-music-vibes-lettering-text-black-brick-background-night-purple-blue-vivid-lights-word-inscription-title-glow-183974382.jpg",
    page: 3
  },
  {
    caption: "discover the best algorithms here!",
    image: "https://tekkieuni.com/wp-content/uploads/2020/01/algorithm-for-kids.jpg",
    page: 4
  }
];

export default function LandingPageFeature() {


    let [carouselPageNum, setCarouselPageNum] = useState(1);

    /* changes slides at set time interval */
    useEffect(() => {
      setInterval(() => {
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
    }, []);

    const handleChange = (event, pageNum) => {
      setCarouselPageNum(pageNum);
    };

    /* change slides */
    const switchSlide = useCallback((n) => {
      setCarouselPageNum(num => {
        num += n;
        if (num > slides.length) num -= 1;
        if (num < 0) num = 0;
        return num;
      });
    }, []);

    return (
      <>
        <Paper id='landing-container' elevation={3}>
        <a className="prev" onClick={() => switchSlide(-1)}>&#10094;</a>
          <CarouselItem 
            caption={slides[carouselPageNum - 1].caption}
            imageUrl={slides[carouselPageNum - 1].image}
          />
          <a className="next" onClick={() => switchSlide(1)}>&#10095;</a>
          <Pagination count={slides.length} variant="outlined" page={carouselPageNum} hidePrevButton hideNextButton onChange={handleChange}/>
        </Paper>
      </>
    );
}

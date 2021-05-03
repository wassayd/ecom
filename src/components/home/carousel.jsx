import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import imageOne from "./images/carrousel-1.jpg"
import imageTwo from "./images/carrousel-2.jpg"
import imageThree from "./images/carrousel-3.jpg"

const MyCarousel = () => (
  <Carousel plugins={['arrows', 'autoplay','infinite']}>
    <img src={imageOne}  width="100%" height="685px"/>
    <img src={imageTwo}  width="100%" height="685px"/>
    <img src={imageThree} width="100%" height="685px" />
  </Carousel>
);

export default MyCarousel;
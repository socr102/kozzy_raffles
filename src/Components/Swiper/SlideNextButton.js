import React from "react";
import Next from '../../assets/next.svg';

import { useSwiper } from 'swiper/react';

export default function SlideNextButton() {
  const swiper = useSwiper();
  const f = () => {
    swiper.slideNext();
  }
  return (
    <img onClick={() => f()} src={Next} alt="next" className="ml-5 cursor-pointer"/>
  );
}
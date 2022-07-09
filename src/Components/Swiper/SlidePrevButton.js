import React from "react";
import Prev from '../../assets/prev.svg';

import { useSwiper } from 'swiper/react';

export default function SlidePrevButton() {
  const swiper = useSwiper();
  const f = () => {
    swiper.slidePrev();
  }

  return (
    <img onClick={() =>f()} src={Prev} alt="button" className="mr-5 cursor-pointer"/>
  );
}
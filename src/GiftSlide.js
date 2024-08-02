import React from "react";
import { useState } from "react";
import { Image } from "@nextui-org/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import ListItem from './listItem';

function GiftSlide(props) {
  const [currentIndex, setCurrentIndex] = useState(props.index);
  console.log(props.item.gift);
  return (
    <>
      {props.item.gift.map((one_gift, index) => (
        // <Image
        // width={300}
        // alt=""
        // src={one_gift[index]}
        // />
        <></>
      ))}
    </>
  )
}

export default GiftSlide;
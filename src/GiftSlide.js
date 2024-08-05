import React from "react";
import { useState } from "react";
import { Image } from "@nextui-org/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import ListItem from './listItem';

function GiftSlide(props) {
  const [currentIndex, setCurrentIndex] = useState(props.index);
  // console.log(props.item.gift);

  return (
    <div className="flex items-center justify-center h-full relative" draggable="true" >
      {props.item.gift.map((one_gift, index) => (
        one_gift.type == "image"?
          <Image
          isBlurred
          isZoomed
          radius="none"
          alt="image"
          loading="lazy"
          src={one_gift.src}
          classNames={{
            wrapper:"gift_image_wrapper",
            img: "gift_image"
          }}
          style={{width:'auto', height: "80vh", objectFit: "contain" }}
          fill="true"
          />
        : one_gift.type == "image_group"?
          <>
            { one_gift.src.map((one_src, index) => (
              <Image
              isBlurred
              isZoomed
              radius="none"
              alt="image"
              loading="lazy"
              src={one_src}
              classNames={{
                wrapper:"gift_image_wrapper",
                img: "gift_image"
              }}
              style={{width:'auto', height: "80vh", objectFit: "contain" }}
              fill="true"
              />
            ))}
          </>
        : one_gift.type == "video"?
          <div className='iframe-container-div h-full w-full place-content-center'>
            <iframe src={one_gift.src} allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="h-1/2 w-full" muted>
            </iframe>
          </div>
        : one_gift.type == "text"?
          <>
            {one_gift.html}
          </>
        : null
      ))}
    </div>
  )
}

export default GiftSlide;
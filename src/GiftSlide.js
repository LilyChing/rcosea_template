import React from "react";
import { useState } from "react";
import { Image } from "@nextui-org/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTwitch, faYoutube, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import ListItem from './listItem';

function GiftSlide(props) {
  const [currentIndex, setCurrentIndex] = useState(props.index);
  const [isHovered, setIsHovered] = useState(false);
  // console.log(props.item.gift);

  // const handleMouseOver = (e) => setIsHovered(true);

  return (
    <div className="gift_container flex items-center justify-center h-full relative" onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
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
          style={{width:'auto', height: "80svh", objectFit: "contain" }}
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
              style={{width:'auto', height: "80svh", objectFit: "contain" }}
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
      {
        <div className="caption backdrop-blur-sm bg-sky-700/50 p-2 lg:p-6 block lg:hidden h-fit lg:h-0">
          <div className="flex flex-col text-center pb-0 md:pb-2 lg:pb-4">
            <p className="text-lg break-all">{props.item.name}</p>
            <div className="flex gap-4 justify-evenly">
            {
              [
                {name: props.item.Twitter_ID, icon: faTwitter},
                {name: props.item.Twitch_ID, icon: faTwitch}, 
                {name: props.item.YouTube_ID, icon: faYoutube}, 
                {name: props.item.IG_ID, icon: faInstagram},
                {name: props.item.Discord_ID, icon: faDiscord}

              ].map((social_media) => {
                return social_media.name ?
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={social_media.icon} size="sm" />
                  <p className="text-small break-all">{social_media.name}</p>
                </div>
                : null
              })
            }
            </div>
          </div>
          <p className="whitespace-pre-line hidden md:block">「 {props.item.message} 」</p>
        </div>
      }
    </div>
  )
}

export default GiftSlide;
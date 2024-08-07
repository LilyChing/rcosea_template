import React from "react";
import { useState } from "react";
import { Image } from "@nextui-org/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTwitch, faYoutube, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import ListItem from './listItem';
import AudioPlayer from 'react-modern-audio-player';
import BGM from './multimedia/lazy_ren_2024_2.wav'

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
        : one_gift.type == "audio"?
          <AudioPlayer 
            playList={[{
              name: one_gift.name,
              writer: one_gift.writer,
              src: BGM,
              id: 1,
            }]} 
            audioInitialState={{
              muted: false,
              volume: 0.2,
              repeatType: "ONE",
              curPlayId: 1,
            }}
            placement={{
              interface: {
                templateArea: {
                  artwork: "row1-2",
                  playList: "row1-3",
                  trackInfo: "row2-2",
                  trackTimeCurrent: "row3-1",
                  progress: "row3-2",
                  trackTimeDuration: "row3-3",
                  playButton: "row4-2",
                  repeatType: "row4-1",
                  volume: "row4-3"
                },
              },
              player: "top-right",
            }}
            rootContainerProps={{
              colorScheme: "dark", 
              width: "100%"
            }}
            activeUI={{
              all: true,
              playList: false,
              // prevNnext: false,
              // trackTime: false,
              progress: "bar",
            }}
          />
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
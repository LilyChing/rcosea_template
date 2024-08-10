import React from "react";
import Lightbox, {
  Slide,
  useLightboxState,
} from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/styles.css";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTwitch, faYoutube, faInstagram, faDiscord, faPixiv } from '@fortawesome/free-brands-svg-icons'

import ListItem from '../data/listItem';

function RenderDetailSlide({slide}) {
  const index = ListItem.findIndex((el) => el === slide);
  const { currentIndex } = useLightboxState();

  return index === currentIndex ? (
    <Card className="m-3 lg:m-6 w-full md:w-1/2 xl:w-1/3 ">
    <CardHeader className="flex flex-col gap-3">
      {
        slide.icon?
        <>
          <Image
            alt="icon"
            height={140}
            radius="full"
            src={slide.icon}
            width={140}
            className="icon object-cover object-top"
          />
          <Divider/>
        </>
        : null
      }
      <div className="w-full flex flex-col text-center">
        <p className="text-2xl break-all pb-2">{slide.name}</p>
        <div className="flex flex-wrap gap-4 justify-evenly">
          {
            [
              {name: slide.Twitter_ID, icon: faTwitter},
              {name: slide.Twitch_ID, icon: faTwitch}, 
              {name: slide.YouTube_ID, icon: faYoutube}, 
              {name: slide.IG_ID, icon: faInstagram},
              {name: slide.Discord_ID, icon: faDiscord},
              {name: slide.Pixiv_ID, icon: faPixiv},

            ].map((social_media) => {
              return social_media.name ?
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={social_media.icon} size="sm" />
                <p className="text-small break-all">{social_media.name}</p>
              </div>
              : null
            })
          }
        </div>
      </div>
    </CardHeader>
    <Divider/>
    <CardBody>
      <p className="text-lg whitespace-pre-line">{slide.message}</p>
    </CardBody>
  </Card>
  ): null
}

export default function LightboxSlide({
  isActive,
  onClose,
  index,
}) {
  const slideshowRef = React.useRef(null);
  return (
    <>
      <Lightbox
        open={ isActive }
        close={ onClose }
        slides={ ListItem }
        index={ index }
        render={{
          slide: ({ slide }) =>
            <RenderDetailSlide slide={slide} />
        }}
        carousel={{ preload: 1, padding: 0 }}
        controller={{ closeOnBackdropClick: true }}
        plugins={[Slideshow]}
        slideshow={{ ref: slideshowRef, autoplay: false, deplay: 3000}}
        styles={{ 
          container: { backgroundColor: "rgba(0, 0, 0, .8)" } ,
          icon: { "--yarl__icon_size": "4rem"}
        }}
      />
    </>
  )
}
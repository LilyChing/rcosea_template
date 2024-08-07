import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTwitch, faYoutube, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react"
import ListItem from './listItem';

function MessageCard(props) {
  let social_media;
  let social_media_brand;
  if (props.item.Twitch_ID) {
    social_media = props.item.Twitch_ID;
    social_media_brand = faTwitch;
  }else if (props.item.YouTube_ID) {
    social_media = props.item.YouTube_ID;
    social_media_brand = faYoutube;
  }else if (props.item.Twitter_ID){
    social_media = props.item.Twitter_ID;
    social_media_brand = faTwitter;
  }else if (props.item.IG_ID) {
    social_media = props.item.IG_ID;
    social_media_brand = faInstagram;
  }else if (props.item.Discord_ID) {
    social_media = props.item.Discord_ID;
    social_media_brand = faDiscord;
  }

  return (
    <>
    <Card className="my-3 w-full" isPressable onClick={props.onCardClick}>
    <CardHeader className="flex gap-3">
      <div className="shrink-0"> 
      <Image
        alt="icon"
        height={40}
        radius="full"
        src={props.item.icon? props.item.icon : "https://cdn.7tv.app/emote/65c8dacb6546e24bd77812e9/4x.webp"}
        width={40}
        className="icon object-cover object-top"
      />
      </div>
      <div className="flex flex-col text-left">
        <p className="text-md break-all">{props.item.name}</p>
        {
          social_media &&
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={social_media_brand} size="sm" />
            <p className="text-small text-default-500 break-all">{social_media}</p>
          </div>
        }
      </div>
    </CardHeader>
    <Divider/>
    <CardBody>
      <p className="whitespace-pre-line">{props.item.message}</p>
    </CardBody>
  </Card>
  </>
  );
}

export default MessageCard;
import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTwitch, faYoutube, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react"
import ListItem from './listItem';

function MessageCard(props) {
  const [currentIndex, setCurrentIndex] = useState(props.index);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  let social_media;
  let social_media_brand;
  if (props.item.Twitch_ID) {
    social_media = props.item.Twitch_ID;
    social_media_brand = faTwitch;
  }else if (props.item.YouTube_ID) {
    social_media = '@'+props.item.YouTube_ID;
    social_media_brand = faYoutube;
  }else if (props.item.Twitter_ID){
    social_media = '@'+props.item.Twitter_ID;
    social_media_brand = faTwitter;
  }else if (props.item.IG_ID) {
    social_media = '@'+props.item.IG_ID;
    social_media_brand = faInstagram;
  }else if (props.item.Discord_ID) {
    social_media = props.item.Discord_ID;
    social_media_brand = faDiscord;
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex-1);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < ListItem.length - 1) {
      setCurrentIndex(currentIndex+1);
    }
  };

  return (
    // <Card className="max-w-[400px]">
    // <div className="flex basis-1/6">
    <div className="h-full">
    {/* <Card className="m-3" isPressable onPress={() => handleCard(props.item)}> */}
    <Card className="my-3 w-full" isPressable onPress={onOpen}>
    <CardHeader className="flex gap-3">
      <div className="shrink-0"> 
      <Image
        alt="icon"
        height={40}
        radius="full"
        src={props.item.icon? props.item.icon : "https://cdn.7tv.app/emote/63fd1a91f20c15fd16768563/4x.webp"}
        width={40}
        className="icon object-cover object-top"
      />
      </div>
      <div className="flex flex-col text-left">
        <p className="text-md break-all">{props.item.name}</p>
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={social_media_brand} size="sm" />
          <p className="text-small text-default-500 break-all">{social_media}</p>
        </div>
      </div>
    </CardHeader>
    <Divider/>
    <CardBody>
      <p className="whitespace-pre-line">{props.item.message}</p>
    </CardBody>
    {/* <Divider/>
    <CardFooter>
      <Link
        isExternal
        showAnchorIcon
        href="https://github.com/nextui-org/nextui"
      >
        Visit source code on GitHub.
      </Link>
    </CardFooter> */}
  </Card>
    {/* pass the card object and the updater function as props from state */}
    <Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange} onClose={() => setCurrentIndex(props.index)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{ListItem[currentIndex].name}</ModalHeader>
              <ModalBody>
                <p className="whitespace-pre-line"> 
                  {ListItem[currentIndex].message}
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button color="danger" variant="light" onPress={handlePrev}>
                  Previous
                </Button>
                <Button color="primary" onPress={handleNext}>
                  Next
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  </div>
  );
}

export default MessageCard;
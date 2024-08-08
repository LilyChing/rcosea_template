import React, { useState }  from 'react';
import {Spinner} from "@nextui-org/react";
import YouTube, { YouTubeProps } from 'react-youtube';

function VideoPreload(props){
  const [ isLoading, setIsLoading ] = useState(true);
  const [ videoLoading, setVideoLoading ] = useState(true);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };

  return (
    <>
      {
        isLoading && !videoLoading && 
        <Spinner className='relative w-full h-full'/>
      }
      {
        (isLoading || videoLoading) &&
        <div className='w-full h-full absolute' onClick={() => setVideoLoading(false)}>
          <div className='w-full backdrop-blur-sm bg-black/50 text-lg absolute py-4'>{props.video.title}</div>
          <img src={props.video.thumbnailUrl} className='w-full h-full object-cover'/>
        </div>
      }
      {
        !videoLoading &&
        <YouTube videoId={props.video.videoId} opts={opts} onReady={() => {setIsLoading(false)}} className="h-full" />
      }
    </>
  )
}

export default VideoPreload;
import React, { useRef, useState } from 'react';
import './App.css';
// import './Output.css';
import MessageCard from './MessageCard';
import GiftSlide from './GiftSlide';
import ListItem from './data/listItem';
import ren_FPS_playlistExport from './data/ren_FPS_playlistExport.json';
import ren_Gayge_playlistExport from './data/ren_Gayge_playlistExport.json';
import ren_Okay_playlistExport from './data/ren_Okay_playlistExport.json';
import ren_RP_playlistExport from './data/ren_RP_playlistExport.json';
import ren_SF6_playlistExport from './data/ren_SF6_playlistExport.json';
import ren_talk_playlistExport from './data/ren_talk_playlistExport.json';

// Core modules imports are same as usual
import { Navigation, Pagination, Mousewheel, EffectCoverflow, Autoplay } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import LightboxSlide from './component/LightboxSlide';
import AudioPlayer from 'react-modern-audio-player';
import YouTube, { YouTubeProps } from 'react-youtube';
import useWebAnimations from '@wellyshen/use-web-animations';
import BGM from './multimedia/lazy_ren_2024_2.wav';
import hp from './multimedia/HB-01.png';
import ren_only from './multimedia/Ren-deep-01.png';


// export default function App() {
//   return (
//     <Card className="py-4">
//       <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
//         <p className="text-tiny uppercase font-bold">Daily Mix</p>
//         <small className="text-default-500">12 Tracks</small>
//         <h4 className="font-bold text-large">Frontend Radio</h4>
//       </CardHeader>
//       <CardBody className="overflow-visible py-2">
//         <Image
//           alt="Card background"
//           className="object-cover rounded-xl"
//           src="https://nextui.org/images/hero-card-complete.jpeg"
//           width={270}
//         />
//       </CardBody>
//     </Card>
//   );
// }

function App() {
  let swiper_fps_ref = useRef();
  let youtube_ref = useRef();

  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ lightboxOpen, setLightboxOpen] = useState(false);

  const slide_item = [
    {text:'REN Happy Birthday 2024.08.09', img:null},
    {text:'慶生影片', img:null},
  ];

  const introduct = {text:'為你介紹 春魚優秀實況主', img:null};

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };
  
  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    swiper_fps_ref.current.autoplay.start();
    // youtube_ref = event.target;
    // console.log(swiper_fps_ref);
    // event.target.pauseVideo();
  }

  const onPlayerStateChange = (e) => {
    if(e.data == 1){
      swiper_fps_ref.current.autoplay.pause();
    }
  }

  const { ref, getAnimation } = useWebAnimations<HTMLDivElement>({
    keyframes: { transform: ["translateX(0)", "translateX(280px)"] },
    animationOptions: {
      duration: 250,
      fill: "forwards",
      easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    }
  });

  const allowScroll = (swiper) => {
    var activeIndex = swiper.activeIndex;
    var activeSlide = swiper.slides[activeIndex];
    var { scrollHeight, clientHeight } = activeSlide;
    const diff = scrollHeight - clientHeight;
    if (activeSlide.scrollTop === 0) activeSlide.scrollTop = 1;
    else if (activeSlide.scrollTop === diff) activeSlide.scrollTop = diff - 1;
    if (diff > 0) {
      const findScroll = (e) => {
        const scrollUp = e.deltaY < 0;
        if (
          (scrollUp || e.type === "touchmove") &&
          activeSlide.scrollTop <= 0
        ) {
          swiper.mousewheel.enable();
          swiper.allowTouchMove = true;
          activeSlide.removeEventListener("wheel", findScroll);
          activeSlide.removeEventListener("touchmove", findScroll);
        } else if (
          (!scrollUp || e.type === "touchmove") &&
          activeSlide.scrollTop >= diff
        ) {
          swiper.mousewheel.enable();
          swiper.allowTouchMove = true;
          activeSlide.removeEventListener("wheel", findScroll);
          activeSlide.removeEventListener("touchmove", findScroll);
        }
      };
      activeSlide.addEventListener("wheel", findScroll);
      activeSlide.addEventListener("touchmove", findScroll);
      swiper.mousewheel.disable();
      swiper.allowTouchMove = false;
    }
  };

  return (
    <div className="App bg-cover">
      <Swiper
        modules={[Pagination, Mousewheel]}
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        slidesPerView={1}
        speed={500}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChangeTransitionEnd={allowScroll}
        className="h-svh"
      >
          <SwiperSlide>
            <div className='h-svh flex flex-col justify-between text-6xl xl:text-8xl main-cover' ref={ref}>
              <AudioPlayer 
                playList={[{
                  name: 'lazy',
                  writer: '306',
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
                      trackTimeCurrent: "row1-4",
                      trackTimeDuration: "row1-5",
                      progress: "row1-3",
                      playButton: "row1-6",
                      repeatType: "row1-7",
                      volume: "row1-8",
                    },
                  },
                  player: "top-right",
                }}
                rootContainerProps={{
                  colorScheme: "light", 
                  width: "fit-content"
                }}
                activeUI={{
                  all: true,
                  playList: false,
                  trackTime: false,
                  progress: false,
                }}
              />
              <img src={hp} className='w-full lg:w-2/3 mt-16'/>
              <img src={ren_only} className='w-2/3 lg:w-1/5 mb-4'/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='h-svh flex justify-center items-center text-6xl xl:text-8xl'>
              慶生影片
            {/* <iframe src={'https://clips.twitch.tv/embed?clip=BombasticAdorableOcelotMrDestructoid-97wjbk4TQx-p_R6q&parent='+window.location.hostname} parent="" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe> */}
            </div>
          </SwiperSlide>
        <SwiperSlide>
          <div className='text-3xl xl:text-6xl py-4 lg:py-12'>想對你說的話...</div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-3 container">
              {ListItem.map((item, index) => (
                <MessageCard key={index} index={index} item={item} onCardClick={()=>{setLightboxOpen(true);setCurrentIndex(index)}} />
              ))}
            </div>
            <LightboxSlide isActive={lightboxOpen} onClose={()=>setLightboxOpen(false)} index={currentIndex}  />
        </SwiperSlide>
        <SwiperSlide>
          {/* <div className='h-svh flex justify-center items-center text-6xl xl:text-8xl'> */}
            {/* <div className='text-3xl xl:text-6xl pb-4 lg:pb-12'>潤黑潤寶的禮物</div> */}
            <Swiper
              effect={'coverflow'}
              grabCursor={false}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={100}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                  grabCursor: true
                },
              }}
              pagination={{
                type:'progressbar',
                progressbarOpposite: true
              }}
              modules={[Autoplay, EffectCoverflow, Pagination]}
              className="h-svh gift_swiper_container"
              onClick={(swiper) => {
                swiper.autoplay.pause();
              }}
            >
              {ListItem.map((item, index) => (
                item.gift.length > 0
                  ?
                    <SwiperSlide>
                      <GiftSlide key={index} index={index} item={item} />
                    </SwiperSlide>
                  :null
              ))}
            </Swiper>
          {/* </div> */}
        </SwiperSlide>
        <SwiperSlide>
            <div className='h-svh flex justify-center items-center text-3xl xl:text-6xl py-4 lg:py-12'>為你介紹 春魚優秀實況主</div>
            <div className='text-3xl xl:text-6xl py-4 lg:py-12'>冷酷槍男 精華</div>
              <Swiper
                ref={swiper_fps_ref}
                effect={'coverflow'}
                centeredSlides={true}
                slidesPerView={1}
                spaceBetween={100}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                }}
                modules={[Autoplay, EffectCoverflow, Navigation]}
                className="playlist"
                onSwiper={(swiper) => {swiper_fps_ref.current = swiper; swiper.autoplay.stop();}}
              >
                {ren_FPS_playlistExport.map((item, index) => (
                  <SwiperSlide>
                    <YouTube videoId={item.videoId} opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange} className="h-full" />
                  </SwiperSlide>
                ))}
              </Swiper>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default App;

import React, { useRef, useState } from 'react';
import { Avatar, Link, Button, Spinner} from "@nextui-org/react";
import './App.css';
// import './Output.css';
import { useOnLoadImages } from "./component/useOnLoadImages.tsx";
import MessageCard from './MessageCard';
import GiftSlide from './GiftSlide';
import ListItem from './data/listItem';
import ren_FPS_playlistExport from './data/ren_FPS_playlistExport.json';
import ren_Gayge_playlistExport from './data/ren_Gayge_playlistExport.json';
import ren_Okay_playlistExport from './data/ren_Okay_playlistExport.json';
import ren_RP_playlistExport from './data/ren_RP_playlistExport.json';
import ren_SF6_playlistExport from './data/ren_SF6_playlistExport.json';
import ren_talk_playlistExport from './data/ren_talk_playlistExport.json';
import rc_playlistExport from './data/RC_playlistExport.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTwitch, faYoutube, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'

// Core modules imports are same as usual
import { Navigation, Pagination, Mousewheel, EffectCoverflow, Autoplay } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import LightboxSlide from './component/LightboxSlide';
import VideoPreload from './component/VideoPreload';
import AudioPlayer from 'react-modern-audio-player';
import YouTube, { YouTubeProps } from 'react-youtube';
import useWebAnimations from '@wellyshen/use-web-animations';
import BGM from './multimedia/lazy_ren_2024_2.wav';
import hp from './multimedia/HB-01.png';
import ren_only from './multimedia/Ren-deep-01.png';
import renko_clear from './multimedia/renko_clear.png'
import ren_info from './multimedia/REN_info.jpg';
import renko_smile from './multimedia/renko_smile.png';
import rengo_stand from './multimedia/rengo_stand.png';
import about_ren_title from './multimedia/about_ren_title.png';
import about_ren_content from './multimedia/about_ren_content.png';
import fps_title from './multimedia/fps-title.png';
import GAYGE_title from './multimedia/GAYGE-title.png';
import info_title from './multimedia/info-title.png';
import message_title from './multimedia/message-title.png';
import okay_title from './multimedia/okay-title.png';
import RC_title from './multimedia/RC-title.png';
import RP_title from './multimedia/RP-title.png';
import SF6_title from './multimedia/SF6-title.png';
import talk_title from './multimedia/talk-title.png';
import video_title from './multimedia/video-title.png';
import ren_main_img from './multimedia/0809ren_main.png'


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

  const main_video_opts = {
    height: '80%',
    width: '50%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };
  
  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    // swiper_fps_ref.current.autoplay.start();
    // youtube_ref = event.target;
    // console.log(swiper_fps_ref);
    // event.target.pauseVideo();
  }

  const onPlayerStateChange = (e) => {
    if(e.data == 1){
      // swiper_fps_ref.current.autoplay.pause();
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

  const appRef = useRef(null);
  const imagesLoaded = useOnLoadImages(appRef);

  return (
    <div className="App bg-cover" ref={appRef}>
      { 
        !imagesLoaded &&
        <div className='w-full h-full absolute'>
          <Spinner  color="default" className='w-full h-full z-10' size="lg" style={{'background-color': '#97dae1'}}/>
        </div>
      }
      
      <Swiper
        modules={[Pagination, Mousewheel]}
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        slidesPerView={1}
        speed={500}
        preloadImages={false}
        lazy={true}
        touchStartPreventDefault={false}
        onSlideChange={(swiper) => { swiper.mousewheel.enable(); swiper.allowTouchMove = true}}
        // onSwiper={(swiper) => console.log(swiper)}
        onSlideChangeTransitionEnd={allowScroll}
        className="h-svh all_swiper"
      >
          <SwiperSlide>
            <div className='h-full flex flex-col justify-end text-6xl xl:text-8xl' ref={ref}>
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
              <img src={hp} className='w-full lg:w-2/3 mb-4 z-10'/>
              <img src={ren_main_img} className='h-full w-full absolute object-cover object-right'/>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='h-full flex flex-col'>
              <div className='w-svw flex justify-center py-4 lg:py-12'>
                <img src={ video_title } width="50%" />
              </div>
              <YouTube videoId={"HAkQyKMmD5U?si=Wk4ZpKV8E-66w-Qd"} opts={main_video_opts} className="h-full flex justify-center item-center" />
            </div>
            {/* <iframe src={'https://clips.twitch.tv/embed?clip=BombasticAdorableOcelotMrDestructoid-97wjbk4TQx-p_R6q&parent='+window.location.hostname} parent="" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe> */}
          </SwiperSlide>
        <SwiperSlide>
            <div className='w-svw flex justify-center py-4 lg:py-12'>
              <img src={ message_title } width="50%" />
            </div>
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
            <div className='w-svw flex justify-center py-4 lg:py-12'>
              <img src={ info_title } width="50%" />
            </div>
            <div className='container flex items-center'>
              <div>
                <img src={ren_info} height="50%" width="80%"/>
              </div>
              <div>
                <img src={renko_clear} />
              </div>
            </div>
            <div className='h-lvh flex items-center'>
              <div className='flex w-svw items-center backdrop-blur-sm bg-white/20'>
                <div className='container flex items-center gap-16'>
                  <div className='w-full flex flex-col'>
                    <img src={about_ren_title} />
                    <img src={about_ren_content} />
                    {/* <p className='text-3xl xl:text-6xl py-4 lg:py-12'>關於 Ren0809k</p>
                    <p className='mb-4'>於2021年得過塔科夫亞洲區冠軍，曾經是個滿嘴媽媽笑話的冷酷槍男，如今變成滿嘴媽媽笑話的亞洲暖男。擅長射擊遊戲，但也熱愛各種類型的遊戲，為7TV語推廣大師，開台模式時很健談，本質是社恐，喜歡偷偷搞耍惡作劇，是看熱鬧樂子人，有時特別gay裡gay氣。於每晚七點半左右在Twitch開台，每周一公休。</p>
                    <p>相當寵粉的主播經常和觀眾互動或相互問候老媽，即使在DC群依然能看到主播頻繁出現聊天，玩遊戲時不忘照顧聊天室，觀眾們都被其暖男屬性所俘虜，主播也為了呈現給粉絲更好的直播內容，開始努力嘗試許多新事物，而Ren的開台初衷與夢想就是：希望心情不好的人來看台，能讓他們有動力面對明天。</p> */}
                    <div className='flex justify-around mt-8'>
                      {
                        [
                          { name:'Twitch', icon: faTwitch, href:"https://www.twitch.tv/ren0809k/"},
                          { name:'YouTube', icon: faYoutube, href:"https://www.youtube.com/@Ren0809"},
                          { name:'Twitter', icon: faTwitter, href:"https://x.com/Ren0809k_TV"},
                        ].map(({ name, icon, href }) => (
                          <div className='flex flex-col justify-center items-center w-fit'>
                            <Button isIconOnly className="w-12 lg:w-28 h-12 lg:h-28 rounded-full" id={name} href={href}  as={Link} isExternal>
                              <FontAwesomeIcon icon={icon} className='text-sm lg:text-4xl'/>
                            </Button>
                            <p className='text-sm lg:text-xl mt-2'>{name}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div>
                    <img src={rengo_stand} />
                  </div>
                </div>
              </div>
            </div>
            {
              [
                { title: fps_title, playlist: ren_FPS_playlistExport },
                { title: SF6_title, playlist: ren_SF6_playlistExport },
                { title: RP_title, playlist: ren_RP_playlistExport },
                { title: talk_title, playlist: ren_talk_playlistExport },
                { title: okay_title, playlist: ren_Okay_playlistExport },
                { title: GAYGE_title, playlist: ren_Gayge_playlistExport },
                { title: RC_title, playlist: rc_playlistExport },
              ].map(({ title, playlist}) => {
                return (
                <div className='mb-28'>
                  <div className='w-svw flex justify-center mb-8'>
                    <img src={ title } width="40%" />
                  </div>
                  <Swiper
                    // ref={swiper_fps_ref}
                    effect={'coverflow'}
                    centeredSlides={true}
                    slidesPerView={1}
                    spaceBetween={100}
                    loop={true}
                    lazy={true}
                    // autoplay={{
                    //   delay: 3000,
                    //   disableOnInteraction: false,
                    // }}
                    navigation={true}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 200,
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
                    <>
                    {playlist.map((video) => (
                      <SwiperSlide>
                        <VideoPreload video={video} className="h-full" />
                      </SwiperSlide>
                    ))}
                    </>
                  </Swiper>
                </div>
                )
              })
            }
            
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default App;

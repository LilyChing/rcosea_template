import './App.css';
// import './Output.css';
import MessageCard from './MessageCard';
import GiftSlide from './GiftSlide';
import ListItem from './listItem';
import { useRef } from 'react';

// Core modules imports are same as usual
import { Navigation, Pagination, Mousewheel, EffectCoverflow, Autoplay } from 'swiper';
// Direct React component imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';

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

function Slides (props){
  if(props.content.img){
    return <img src={props.content.img}/>
  }else if (props.content.text){
    return props.content.text;
  }
}

function App() {
  const LongRef = useRef();
  // console.log(this.appRef.current)

  const slide_item = [
    {text:'REN Happy Birthday 2024.08.09', img:null},
    {text:'慶生影片', img:null},
  ];

  const introduct = {text:'為你介紹 春魚優秀實況主', img:null};

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
        className="h-lvh"
      >
        {slide_item.map((content, index) => (
          <SwiperSlide>
            <div className='h-lvh flex justify-center items-center text-6xl xl:text-8xl'>
              <Slides key={index} index={index} content={content} />
            </div>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <div className='text-3xl xl:text-6xl py-4 lg:py-12'>潤黑潤寶們想對你說的話</div>
            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-3 container">
              {ListItem.map((item, index) => (
                <MessageCard key={index} index={index} item={item} />
              ))}
            </div>
        </SwiperSlide>
        <SwiperSlide>
          {/* <div className='h-lvh flex justify-center items-center text-6xl xl:text-8xl'> */}
            {/* <div className='text-3xl xl:text-6xl pb-4 lg:pb-12'>潤黑潤寶的禮物</div> */}
            <Swiper
              effect={'coverflow'}
              grabCursor={false}
              centeredSlides={true}
              slidesPerView={1}
              spaceBetween={100}
              loop={true}
              autoplay={{
                delay: 2000,
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
              className=""
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
        <div className='h-lvh flex justify-center items-center text-6xl xl:text-8xl'>
            <div className='text-3xl xl:text-6xl pb-4 lg:pb-12'>為你介紹 春魚優秀實況主</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default App;

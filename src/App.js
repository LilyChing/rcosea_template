import './App.css';
// import './Output.css';
import MessageCard from './MessageCard';
import ListItem from './listItem';
import { useRef } from 'react';
import { useSlidesScroll } from './component/useSideScroll';

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

  return (
    <div className="App bg-cover">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="h-screen scroll-smooth snap-y snap-mandatory overflow-y-auto" ref={useSlidesScroll(LongRef)}>
      {slide_item.map((content, index) => (
        <section className='snap-start' key={index}>
          <div className='h-lvh flex justify-center items-center text-6xl xl:text-8xl'>
            <Slides content={content} />
          </div>
        </section>
      ))}
        <section className='snap-start' ref={LongRef}>
          <div className='text-3xl xl:text-6xl pb-4 lg:pb-12'>潤黑潤寶們想對你說的話</div>
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-6 gap-3 container">
            {ListItem.map((item, index) => (
              <MessageCard key={index} index={index} item={item} />
            ))}
          </div>
        </section>
        <section className='snap-start'>
          <div className='h-lvh flex justify-center items-center text-6xl xl:text-8xl'>
          <div className='text-3xl xl:text-6xl pb-4 lg:pb-12'>潤黑潤寶的禮物</div>
          </div>
        </section>
        <section className='snap-start'>
          <div className='h-lvh flex justify-center items-center text-6xl xl:text-8xl'>
            <Slides content={introduct} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;

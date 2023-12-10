import React, { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'
import Sakura from "../assets/sakura.mp3";
import soundon from "../assets/icons/soundon.png"
import soundoff from "../assets/icons/soundoff.png"
import { useEffect } from 'react'


const Home = () => {
    // mAIN roTATIONG pART HERER
    const [isrotating ,setisrotating] = useState(false);
    const [CurrentStage , setCurrentStage] = useState(1);
    const audioRef = useRef(new Audio(Sakura));
    audioRef.current.volume = 0.4;
    audioRef.current.loopv = true;
    const [isPlaying, setisPlaying] = useState(false)
    useEffect(() => {
      if(isPlaying){
        audioRef.current.play();
      }
      return () => {
        audioRef.current.pause();
      }
    }, [isPlaying])
    

  // Adjusting 3d model size for screen size for island
  const adjustIslandForScreenSize= ()=>{
    let screenscale, screenposition ,rotation;
    screenposition = [0,-6.5,-43];
    rotation = [0.1,4.7,0];
    if(window.innerWidth < 786){
        screenscale = [0.9,0.9,0.9];
    }else{
      screenscale = [1,1,1];
    }
    return [screenscale,screenposition,rotation];
  }
  // for plabe
  const adjustPlaneForScreenSize= ()=>{

    let screenScale, screenPosition ;
    
    if(window.innerWidth < 786){
        screenScale = [1.5,1.5,1.5];
        screenPosition = [0,-1.5,0];
    }else{
      screenScale = [3,3,3];
      screenPosition = [0,-4,-4];
    }
    return [screenScale,screenPosition];
  }
  
  const [islandscale,islandposition,islandrotation] = adjustIslandForScreenSize();
  const [PlaneScale,PlanePosition] = adjustPlaneForScreenSize();
  return (
    <section className={`w-full h-screen relative ${isrotating?'cursor-grabbing':'cursor-grab'}`}>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
           {CurrentStage && <HomeInfo CurrentStage = {CurrentStage}/>}
      </div>
     <Canvas className='w-full h-screen bg-transparent' camera={{near:0.1,far:1000}}>
       <Suspense fallback={<Loader/>}> {/* for loader*/}
           <directionalLight position={[1,1,1]} intensity={2}/>
           <ambientLight intensity={0.5}/>
           {/* <pointLight/> */}
           {/* <spotLight/> */}
           <hemisphereLight skyColor = "#b1e1ff" groundColor="#000000" intensity={1}/>
           <Sky
            isRotating = {isrotating}
           /> 
           <Bird/>
           <Plane
             isRotating = {isrotating}
             position = {PlanePosition}
             scale = {PlaneScale}
             rotation = {[0,20,0]}
             
           />
           <Island
            position =  {islandposition}
            scale = {islandscale}
            rotation = {islandrotation}
            isrotating = {isrotating}
            setisrotating = {setisrotating}
            setCurrentStage = { setCurrentStage}
           />
           
       </Suspense>
     </Canvas>
     <div className='absolute bottom-2 left-2'>
      <img
          src={isPlaying?soundon:soundoff}
          alt='sound'
          className='w-10 h-10 cursor-pointer object-contain'
          onClick={()=>{setisPlaying(!isPlaying)}}
      />
     </div>
    </section>
  )
}

export default Home
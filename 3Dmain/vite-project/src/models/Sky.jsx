import { useGLTF } from '@react-three/drei'
import React, { useRef } from 'react'
import Skyscene from "../assets/3D/sky.glb"
import { useFrame } from '@react-three/fiber';
const Sky = ({isRotating}) => {
    const sky = useGLTF(Skyscene);
    const SkyRef = useRef();
    useFrame((_,delta)=>{
          if(isRotating){
            SkyRef.current.rotation.y += 0.15*delta
          }
    })
  return (
    <mesh ref = {SkyRef}>
        <primitive object={sky.scene}/>
    </mesh>
  )
}

export default Sky
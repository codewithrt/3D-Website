import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef, useState } from 'react'
// import emailjs from 'emailjs.'
import Fox from "../models/Fox"
import Loader from '../components/Loader';
const Contacts = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isloading, setisloading] = useState(false);
  const [currentAnimation, setcurrentAnimation] = useState('idle')
  const Handlechange = (e) => {
      setForm({...form,[e.target.name]:e.target.value});
  }
  const HandleFocus = () => {
      setcurrentAnimation('walk');
  }
  const Handleblur = () => {
     setcurrentAnimation('idle');
  }
  const HandleSubmit = (e) =>{
    e.preventDefault();
    setisloading(true);
    setcurrentAnimation("hit");
    setTimeout(() => {
      setcurrentAnimation("idle");
      setisloading(false);
      setForm({ name: "", email: "", message: "" });
    }, 4000);
  }
  return (
    <section className='relative flex lg:flex-col flex-col max-container'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>
          Get In Touch
        </h1>
        <form className='w-full flex flex-col gap-7 mt-14' onSubmit={HandleSubmit}>
          <label className='text-black-500 font-semibold'>
            Name
          </label>
          <input type='text' name='name' className='input' placeholder='John' required value={form.name} onChange={Handlechange} onFocus={HandleFocus} onBlur={Handleblur} />
          <label className='text-black-500 font-semibold'>
            Email
          </label>
          <input type='text' name='email' className='input' placeholder='John@123.com' required value={form.email} onChange={Handlechange} onFocus={HandleFocus} onBlur={Handleblur} />
          <label className='text-black-500 font-semibold'>
            Message
          </label>
          <textarea type='text' name='message' className='input' placeholder='Let me Know How can I help you' required value={form.message} onChange={Handlechange} onFocus={HandleFocus} onBlur={Handleblur} />
          <button type='submit' className='btn' disabled={isloading} onFocus={HandleFocus} onBlur={Handleblur}>
             {isloading?"Sending...":"Send Message"}
          </button>
        </form>
      </div>
      <div className='lg:w-1/2 w-full ;g:h-auto md:h-[550px] h-[350px]'>
           <Canvas
            camera={{position:[0,0,5],fov:75,near:0.1,far:1000}}
              >
            <directionalLight intensity={2.5} position={[0,0,1]}/>
            <ambientLight intensity={0.5}/>
           <Suspense fallback={<Loader/>}>
              <Fox
              currentAnimation={currentAnimation}
              position={[0.5,0.35,0]}
              rotation ={[12.6,-0.6,0]}
              scale ={[0.5,0.5,0.5]}
              />
           </Suspense>
           </Canvas>
      </div>
    </section>
  )
}

export default Contacts
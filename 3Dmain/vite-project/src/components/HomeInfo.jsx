import React from 'react'
// import { arrow } from "../assets/icons";
import { Link } from 'react-router-dom';

const InfoBox = ({text,link,btn}) =>{
    return (
     <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>{text}</p>
        <Link to={link} className='neo-brutalism-white neo-btn'>
            {btn}
        </Link>
     </div>
    )
}

const RenderEle = {
    1:(
        <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
            Hi , I am <span className='font-semibold'>Rahul</span> 👋
            <br/>
            A Software Enginner from India
        </h1>
    ),
    2:(
        <InfoBox text= "Worked in many companies and picked up many skills along the Way" link="/about" btn="Learn More"/>
        // 78
    ),
    3:(
        <InfoBox text= "Let Multiple Projects to sucess over the years. Curious about the impact" link="/projects" btn="Visit My Portfolio"/>
    ),
    4:(
        <InfoBox text= "Need a project done or looking for a Dev? I am just a few keystokes away" link="/contact" btn="Let's Talk"/>
    ),
}

const HomeInfo = ({CurrentStage}) => {
  return RenderEle[CurrentStage]||null;
}

export default HomeInfo
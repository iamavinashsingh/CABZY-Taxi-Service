import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Cabzy-Logo.png'

const Start = () => {
  return (
    <div>
        <div className='bg-[url(assets/Taxi-Bg.png)] bg-cover bg-center h-screen w-full pt-8  flex flex-col justify-between '>
            <img src={logo}  alt="Logo of Cabzy" className='w-28 ml-8 ' />
            <div className='bg-[#F7F7F9] px-5 py-5 pb-7 rounded-tl-md rounded-tr-md'>
                <h2 className='text-3xl font-bold'>Get Started with Cabzy</h2> 
                <Link to='/login' className='flex justify-center items-center bg-[#242430] w-full text-[#F7F7F9] py-3 rounded-md mt-4'>Continue</Link>  
            </div> 
        </div>
    </div>
  )
}

export default Start
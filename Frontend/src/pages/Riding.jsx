import React from 'react'
import mapBg from '../assets/Taxi-Map.jpg'
import bikeIcon from '../assets/bikeIcon.png'
import cabIcon from '../assets/cabIcon.png'
import autoIcon from '../assets/autoIcon.png'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'


const Riding = () => {

  const location = useLocation()
  const { ride } = location.state || {} // Retrieve ride data
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  

  socket.on("ride-ended", () => {
      navigate('/home', { replace: true })
  })

  return (
    <div className='h-screen '>
      {/*====================================  Home ======================================================== */}
      <Link to='/home' className='fixed  h-10 w-10 flex items-center justify-center bg-[#242430] rounded-full top-2 right-2 z-50 cursor-pointer'>
        <i className="text-xl font-semibold text-[#F7F7F9] ri-home-5-line"></i>
      </Link>
      {/*====================================  MAP BG  ======================================================== */}
      <div className='h-1/2'>
        {/* <img className='h-full w-full object-cover' src={mapBg} alt="" /> */}
        <LiveTracking />
      </div>
      {/*====================================  DRIVER INFO  ======================================================== */}
      <div className='h-1/2 px-4 py-2'>
        <div className='flex items-center justify-between'>
          <img className='h-12' src={cabIcon} alt="" />
          <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullname?.firstname}</h2>
          <h4 className='text-xl font-bold -mt-1 -mb-1 uppercase'>{ride?.captain?.vehicle?.plate}</h4>
          <p className='text-sm text-gray-600'>Swift Dzire</p>                  
          </div>
        </div>
                      
        <div className='flex flex-col gap-2 items-center justify-between '>                          
          <div className='w-full'>
          {/* =================================================== PICKUP ========================================================= */}
            <div className='flex items-center gap-5 p-2 border-b-2'>
            <i className=" text-lg ri-map-pin-3-line"></i>
            <div>                
              <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
            </div>
            </div>
            {/* =================================================== DROP ========================================================= */}
            <div className='flex items-center gap-5 p-2 border-b-2'>
              <i className=" text-lg ri-map-pin-4-line"></i>
              <div>
                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
              </div>
            </div>
          {/* =================================================== MONEY ========================================================= */}
            <div className='flex items-center gap-5 p-2 border-b-2'>
              <i className=" text-lg ri-cash-line"></i>
              <div>
                <h3 className='text-lg font-semibold'>₹{ride?.fare}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
              </div>
            </div>
          
          </div>
          
        </div>
        <button className='bg-[#242430] rounded-md px-4 py-2  w-full text-lg text-[#F7F7F9] font-bold mt-2 active:scale-[99%] transition-transform duration-100 '>Make Payment</button>
      </div>
    </div>
  )
}

export default Riding

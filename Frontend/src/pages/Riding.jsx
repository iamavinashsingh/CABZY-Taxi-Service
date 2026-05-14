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
  const { ride } = location.state || {}
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  socket.on("ride-ended", () => {
    navigate('/home', { replace: true })
  })

  return (
    <div className='h-screen bg-[#f5f5f7]'>
      {/* Home button - floating glass */}
      <Link to='/home' className='fixed z-50 top-5 right-5 w-10 h-10 rounded-xl bg-white/80 backdrop-blur-xl shadow-lg flex items-center justify-center hover:bg-white transition-all'>
        <i className="text-[18px] text-[#1d1d1f] ri-home-5-line"></i>
      </Link>

      {/* Map */}
      <div className='h-[55%]'>
        <LiveTracking />
      </div>

      {/* Ride info - floating card */}
      <div className='h-[45%] bg-white rounded-t-[28px] -mt-6 relative z-10 flex flex-col px-6 py-5'>
        {/* Driver header */}
        <div className='flex items-center justify-between pb-4'>
          <div className='flex items-center gap-3'>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] flex items-center justify-center'>
              <img className='h-8' src={cabIcon} alt="Vehicle" />
            </div>
            <div>
              <h2 className='text-[17px] font-semibold text-[#1d1d1f] capitalize'>{ride?.captain?.fullname?.firstname}</h2>
              <p className='text-[13px] text-[#86868b]'>Swift Dzire</p>
            </div>
          </div>
          <div className='text-right'>
            <h4 className='text-[18px] font-bold text-[#1d1d1f] uppercase tracking-wider'>{ride?.captain?.vehicle?.plate}</h4>
          </div>
        </div>
                      
        <div className='divider' />

        {/* Details */}
        <div className='flex-1 flex flex-col mt-3 space-y-1'>
          <div className='flex items-center gap-3 py-2.5'>
            <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
              <i className="text-[14px] text-[#0066cc] ri-map-pin-3-line"></i>
            </div>
            <p className='text-[14px] text-[#86868b] flex-1 leading-snug'>{ride?.pickup}</p>
          </div>
          <div className='flex items-center gap-3 py-2.5'>
            <div className='w-8 h-8 rounded-xl bg-[#1d1d1f]/5 flex items-center justify-center flex-shrink-0'>
              <i className="text-[14px] text-[#1d1d1f] ri-map-pin-4-line"></i>
            </div>
            <p className='text-[14px] text-[#86868b] flex-1 leading-snug'>{ride?.destination}</p>
          </div>
          <div className='flex items-center gap-3 py-2.5'>
            <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
              <i className="text-[14px] text-[#0066cc] ri-money-rupee-circle-line"></i>
            </div>
            <div>
              <h3 className='text-[17px] font-semibold text-[#1d1d1f]'>₹{ride?.fare}</h3>
              <p className='text-[12px] text-[#86868b]'>Cash Payment</p>
            </div>
          </div>
        </div>
        
        <button className='btn-hero w-full'>Make Payment</button>
      </div>
    </div>
  )
}

export default Riding

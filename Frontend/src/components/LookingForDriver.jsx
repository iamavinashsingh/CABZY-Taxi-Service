import React from 'react'
import bikeIcon from '../assets/bikeIcon.png'
import cabIcon from '../assets/cabIcon.png'
import autoIcon from '../assets/autoIcon.png'

const LookingForDriver = (props) => {
  const icons = { bike: bikeIcon, car: cabIcon, auto: autoIcon };

  return (
    <div>
      <div className='sheet-handle' />
      <h5 onClick={() => props.setVehicleFound(false)}
        className='absolute top-3 right-5 text-[#86868b] cursor-pointer hover:text-[#1d1d1f] transition-colors'>
        <i className="text-2xl ri-close-line"></i>
      </h5>
      <h3 className='text-[22px] font-semibold text-[#1d1d1f] mb-1'>Looking for a driver</h3>
      <p className='text-[14px] text-[#86868b] mb-4'>Hang tight, we're finding the best match</p>

      {/* Animated vehicle */}
      <div className='flex flex-col items-center mb-5'>
        <div className='w-20 h-20 rounded-3xl bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] flex items-center justify-center float relative'>
          <img className='h-12' src={icons[props.vehicleType]} alt="Vehicle" />
          {/* Pulse ring */}
          <div className='absolute inset-0 rounded-3xl border-2 border-[#0066cc]/20 animate-ping' style={{animationDuration:'2s'}} />
        </div>
        <div className='pulse-dots mt-4'>
          <span></span><span></span><span></span>
        </div>
      </div>

      {/* Details */}
      <div className='bg-[#f5f5f7] rounded-2xl p-4 space-y-0'>
        <div className='flex items-center gap-3 py-2.5'>
          <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#0066cc] ri-map-pin-3-line"></i>
          </div>
          <p className='text-[14px] text-[#86868b] flex-1 truncate'>{props.pickup}</p>
        </div>
        <div className='h-px bg-white' />
        <div className='flex items-center gap-3 py-2.5'>
          <div className='w-8 h-8 rounded-xl bg-[#1d1d1f]/5 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#1d1d1f] ri-map-pin-4-line"></i>
          </div>
          <p className='text-[14px] text-[#86868b] flex-1 truncate'>{props.destination}</p>
        </div>
        <div className='h-px bg-white' />
        <div className='flex items-center gap-3 py-2.5'>
          <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#0066cc] ri-money-rupee-circle-line"></i>
          </div>
          <span className='text-[16px] font-semibold text-[#1d1d1f]'>₹{props.fare[props.vehicleType]}</span>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver
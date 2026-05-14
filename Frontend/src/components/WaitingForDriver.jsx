import React from 'react'
import cabIcon from '../assets/cabIcon.png'

const WaitingForDriver = (props) => {
  return (
    <div>
      <div className='sheet-handle' />
      <h5 onClick={() => props.setWaitingForDriver(false)}
        className='absolute top-3 right-5 text-[#86868b] cursor-pointer hover:text-[#1d1d1f] transition-colors'>
        <i className="text-2xl ri-close-line"></i>
      </h5>

      {/* Driver card */}
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-center gap-3'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] flex items-center justify-center'>
            <img className='h-9' src={cabIcon} alt="Vehicle" />
          </div>
          <div>
            <h2 className='text-[17px] font-semibold text-[#1d1d1f] capitalize'>{props.ride?.captain?.fullname?.firstname}</h2>
            <p className='text-[13px] text-[#86868b]'>Swift Dzire · <span className='uppercase font-medium text-[#1d1d1f]'>{props.ride?.captain?.vehicle?.plate}</span></p>
          </div>
        </div>
        {/* OTP */}
        <div className='bg-[#1d1d1f] rounded-2xl px-4 py-2.5 text-center'>
          <p className='text-[10px] text-white/50 uppercase tracking-widest'>OTP</p>
          <span className='text-[20px] font-bold text-white font-mono tracking-[0.25em]'>{props.ride?.otp}</span>
        </div>
      </div>

      <div className='divider' />

      {/* Ride details */}
      <div className='space-y-1 mt-3'>
        <div className='flex items-center gap-3 py-2.5'>
          <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#0066cc] ri-map-pin-3-line"></i>
          </div>
          <p className='text-[14px] text-[#86868b] flex-1'>{props.ride?.pickup}</p>
        </div>
        <div className='flex items-center gap-3 py-2.5'>
          <div className='w-8 h-8 rounded-xl bg-[#1d1d1f]/5 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#1d1d1f] ri-map-pin-4-line"></i>
          </div>
          <p className='text-[14px] text-[#86868b] flex-1'>{props.ride?.destination}</p>
        </div>
        <div className='flex items-center gap-3 py-2.5'>
          <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#0066cc] ri-money-rupee-circle-line"></i>
          </div>
          <div>
            <h3 className='text-[17px] font-semibold text-[#1d1d1f]'>₹{props.ride?.fare}</h3>
            <p className='text-[12px] text-[#86868b]'>Cash Payment</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
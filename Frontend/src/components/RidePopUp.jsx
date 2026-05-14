import React from 'react'
import upfp from '../assets/diyaPFP.jpg'

const RidePopUp = (props) => {
  return (
    <div>
      <div className='sheet-handle' />
      <h5 onClick={() => props.setRidePopupPanel(false)}
        className='absolute top-3 right-5 text-[#86868b] cursor-pointer hover:text-[#1d1d1f] transition-colors'>
        <i className="text-2xl ri-close-line"></i>
      </h5>

      {/* Badge */}
      <div className='inline-flex items-center gap-1.5 bg-[#0066cc]/10 text-[#0066cc] text-[12px] font-semibold px-3 py-1 rounded-full mb-4'>
        <span className='w-2 h-2 rounded-full bg-[#0066cc] animate-pulse' />
        New ride request
      </div>

      {/* User + distance */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-2xl object-cover' src={upfp} alt="User" />
          <h4 className='text-[17px] font-semibold text-[#1d1d1f] capitalize'>
            {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
          </h4>
        </div>
        <div className='bg-[#0066cc] text-white text-[14px] font-bold px-3.5 py-1.5 rounded-xl'>
          {props.ride?.distance}km
        </div>
      </div>

      <div className='divider' />

      {/* Details */}
      <div className='bg-[#f5f5f7] rounded-2xl p-3 mt-4 space-y-0'>
        <div className='flex items-center gap-3 py-2.5'>
          <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#0066cc] ri-map-pin-3-line"></i>
          </div>
          <p className='text-[14px] text-[#86868b] flex-1 truncate'>{props.ride?.pickup}</p>
        </div>
        <div className='h-px bg-white' />
        <div className='flex items-center gap-3 py-2.5'>
          <div className='w-8 h-8 rounded-xl bg-[#1d1d1f]/5 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#1d1d1f] ri-map-pin-4-line"></i>
          </div>
          <p className='text-[14px] text-[#86868b] flex-1 truncate'>{props.ride?.destination}</p>
        </div>
        <div className='h-px bg-white' />
        <div className='flex items-center gap-3 py-2.5'>
          <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#0066cc] ri-money-rupee-circle-line"></i>
          </div>
          <span className='text-[16px] font-semibold text-[#1d1d1f]'>₹{props.ride?.fare}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className='flex gap-3 mt-5'>
        <button onClick={() => props.setRidePopupPanel(false)}
          className='btn-ghost flex-1'>
          Decline
        </button>
        <button onClick={() => { props.setConfirmRidePopupPanel(true); props.confirmRide(); }}
          className='btn-hero flex-1'>
          Accept
        </button>
      </div>
    </div>
  )
}

export default RidePopUp
import React from 'react'
import bikeIcon from '../assets/bikeIcon.png'
import cabIcon from '../assets/cabIcon.png'
import autoIcon from '../assets/autoIcon.png'

const ConfirmRide = (props) => {
  const icons = { bike: bikeIcon, car: cabIcon, auto: autoIcon };

  return (
    <div>
      <div className='sheet-handle' />
      <h5 onClick={() => props.setConfirmRidePanel(false)}
        className='absolute top-3 right-5 text-[#86868b] cursor-pointer hover:text-[#1d1d1f] transition-colors'>
        <i className="text-2xl ri-close-line"></i>
      </h5>
      <h3 className='text-[22px] font-semibold text-[#1d1d1f] mb-5'>Confirm your ride</h3>

      {/* Vehicle display */}
      <div className='flex justify-center mb-5'>
        <div className='w-20 h-20 rounded-3xl bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] flex items-center justify-center float'>
          <img className='h-12' src={icons[props.vehicleType]} alt="Vehicle" />
        </div>
      </div>

      {/* Ride details */}
      <div className='bg-[#f5f5f7] rounded-2xl p-4 space-y-0'>
        <div className='flex items-center gap-3 py-3'>
          <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#0066cc] ri-map-pin-3-line"></i>
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-[11px] text-[#86868b] uppercase tracking-wider'>Pickup</p>
            <p className='text-[14px] text-[#1d1d1f] truncate'>{props.pickup}</p>
          </div>
        </div>
        <div className='h-px bg-white' />
        <div className='flex items-center gap-3 py-3'>
          <div className='w-8 h-8 rounded-xl bg-[#1d1d1f]/5 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#1d1d1f] ri-map-pin-4-line"></i>
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-[11px] text-[#86868b] uppercase tracking-wider'>Destination</p>
            <p className='text-[14px] text-[#1d1d1f] truncate'>{props.destination}</p>
          </div>
        </div>
        <div className='h-px bg-white' />
        <div className='flex items-center gap-3 py-3'>
          <div className='w-8 h-8 rounded-xl bg-[#0066cc]/10 flex items-center justify-center flex-shrink-0'>
            <i className="text-[14px] text-[#0066cc] ri-money-rupee-circle-line"></i>
          </div>
          <div>
            <p className='text-[11px] text-[#86868b] uppercase tracking-wider'>Fare</p>
            <h3 className='text-[17px] font-semibold text-[#1d1d1f]'>₹{props.fare[props.vehicleType]}</h3>
          </div>
        </div>
      </div>

      <button onClick={() => {
          props.setVehicleFound(true)
          props.setConfirmRidePanel(false)
          props.createRide()
        }}
        className='btn-hero w-full mt-5'>
        Confirm Ride
      </button>
    </div>
  )
}

export default ConfirmRide
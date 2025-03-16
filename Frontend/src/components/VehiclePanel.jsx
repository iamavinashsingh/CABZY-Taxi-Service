import React from 'react'
import bikeIcon from '../assets/bikeIcon.png'
import cabIcon from '../assets/cabIcon.png'
import autoIcon from '../assets/autoIcon.png'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={() => {
                props.setVehiclePanel(false)
            }}
          className='absolute p-1 w-[90%] text-center top-0'><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className='text-2xl font-bold mb-2 text-[#242430]'>Choose a ride</h3>
        {/* ====================================================== Mini Car  ==========================================*/}
        <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.setVehicle('car')
              }}
          className='flex items-center justify-between bg-[#F7F7F9] p-3 w-full rounded-xl border-2 active:border-[#EFBE1D] mb-2'>
          <img className='h-12 mr-2' src={cabIcon} alt="" /> 
          <div className='w-1/2'>
            <h4 className='font-bold text-base'>Cabzy Lite <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='font-mono text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact ride</p>
          </div> 
          <h2 className='text-lg  font-semibold '>₹{props.fare?.car || 'N/A'}</h2>
        </div>
        {/* ====================================================== Bike  ==========================================*/}
        <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.setVehicle('bike')
              }} 
          className='flex items-center justify-between bg-[#F7F7F9] p-3 w-full rounded-xl border-2 active:border-[#EFBE1D] mb-2'>
          <img className='h-12 mr-2' src={bikeIcon} alt="" /> 
          <div className='w-1/2'>
            <h4 className='font-bold text-base'>Cabzy Bike <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='font-mono text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Ultra-affordable, fastest ride</p>
          </div> 
          <h2 className='text-lg  font-semibold '>₹{props.fare?.bike || 'N/A'}</h2>
        </div>
        {/* ====================================================== Auto  ==========================================*/}
        <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.setVehicle('auto')
              }}
          className='flex items-center justify-between bg-[#F7F7F9] p-3 w-full rounded-xl border-2 active:border-[#EFBE1D] mb-2'>
          <img className='h-12 mr-2' src={autoIcon} alt="" /> 
          <div className='w-1/2'>
            <h4 className='font-bold text-base'>Cabzy Auto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='font-mono text-sm'>1 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Economical, quick ride</p>
          </div> 
          <h2 className='text-lg  font-semibold '>₹{props.fare?.auto || 'N/A'}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel
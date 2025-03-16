import React from 'react'
import upfp from '../assets/diyaPFP.jpg'

const RidePopUp = (props) => {
return (
<div>
    <h5 onClick={() => {
                props.setRidePopupPanel(false)
            }}
        className='absolute p-1 w-[90%] text-center top-0'><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
    </h5>    
    {/* =================================================== USER INFO ========================================================= */}
    <div className='flex items-center justify-between border-gray-600 border-b-2 p-2'>
        <div className='flex items-center gap-3 '>  
            <div className='flex items-center justify-between gap-2 '>
                <img className='h-16 rounded-full' src={upfp} alt="" />
                <div className='text-right'>
                    <p className='text-xs text-[#A44720]'>New Ride Available!!!</p>
                    <h4 className='text-lg font-bold uppercase'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h4>                                     
                </div>
            </div>       
        </div>
        {/* =================================================== DISTANCE ========================================================= */}
        <h5 className='text-xl text-[#F7F7F9] font-bold bg-[#EFBE1D] px-2 py-1 rounded-md '>{props.ride?.distance}km</h5>
    </div>
    {/* =================================================== PICKUP ========================================================= */}
    <div className='flex items-center gap-5 p-3 border-b-2'>
        <i className=" text-lg text-[#A44720] ri-map-pin-3-line"></i>
        <div>
            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
        </div>
    </div>
    {/* =================================================== DROP ========================================================= */}
    <div className='flex items-center gap-5 p-3 border-b-2'>
        <i className=" text-lg text-[#1C8147] ri-map-pin-4-line"></i>
        <div>
            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
        </div>
    </div>
    {/* =================================================== MONEY ========================================================= */}
    <div className='flex items-center gap-5 p-3 border-b-2'>
        <i className=" text-lg ri-cash-line"></i>
        <div>
            <h3 className='text-lg font-semibold'>₹{props.ride?.fare}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
        </div>
    </div>
    {/* =================================================== BUTTONS  ========================================================= */}
    <div className='relative flex justify-center w-full items-center pt-4 gap-2'>        
        <button
            onClick={()=>{
                props.setRidePopupPanel(false)
                
            }}
            className='flex justify-center items-center w-2/3 text-[#242430] py-2 rounded-md bg-gray-300 active:scale-[99%] transition-transform duration-100'>Ignore</button>
        <button 
            onClick={()=>{
                props.setConfirmRidePopupPanel(true)
                props.confirmRide()
                
            }}
            className='flex justify-center items-center w-2/3 text-[#F7F7F9] py-2 rounded-md bg-[#1C8147] active:scale-[99%] transition-transform duration-100'>Accept</button>
    </div>
</div>
)
}

export default RidePopUp
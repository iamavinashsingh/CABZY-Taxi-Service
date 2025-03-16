import React from 'react'
import bikeIcon from '../assets/bikeIcon.png'
import cabIcon from '../assets/cabIcon.png'
import autoIcon from '../assets/autoIcon.png'


const WaitingForDriver = (props) => {
return (
    <div>
            <h5 onClick={(props) => {
                    props.setWaitingForDriver(false);
                }}
            className='absolute p-1 w-[90%] text-center top-0'><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
            </h5>
            
        <div className='flex items-center justify-between'>
            <img className='h-16 ml-6' src={cabIcon} alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium capitalize'>{props.ride?.captain?.fullname?.firstname}</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1 uppercase'>{props.ride?.captain?.vehicle?.plate}</h4>
                <p className='text-sm text-gray-600'>Swift Dzire</p>
                <div className='flex items-center justify-end my-2 '>
                    <h1 className='text-lg  font-bold bg-[#242430] px-2 rounded-lg text-gray-300 '>{props.ride?.otp}</h1>
                </div>     
            </div>
        </div>
            
        <div className='flex flex-col gap-2 items-center justify-between '>
                
                <div className='w-full'>
                    {/* =================================================== PICKUP ========================================================= */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className=" text-lg ri-map-pin-3-line"></i>
                    <div>
                        <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                    </div>
                    </div>
                    {/* =================================================== DROP ========================================================= */}
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className=" text-lg ri-map-pin-4-line"></i>
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
    
                </div>
        </div>
    </div>
)
}

export default WaitingForDriver
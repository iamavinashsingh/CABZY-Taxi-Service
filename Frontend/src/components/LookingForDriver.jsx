import React from 'react'
import bikeIcon from '../assets/bikeIcon.png'
import cabIcon from '../assets/cabIcon.png'
import autoIcon from '../assets/autoIcon.png'


const LookingForDriver = (props) => {
    const { vehicleType } = props; // Assuming you're passing vehicleType as a prop, or use state in Home.jsx
      
      let vehicleIcon;
    
      // Determine which icon to display based on vehicleType
      if (vehicleType === 'bike') {
        vehicleIcon = bikeIcon;
      } else if (vehicleType === 'car') {
        vehicleIcon = cabIcon;
      } else if (vehicleType === 'auto') {
        vehicleIcon = autoIcon;
      }
  return (
    <div >
        <h5 onClick={() => {
                props.setVehicleFound(false)
            }}
            className='absolute p-1 w-[90%] text-center top-0'><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-bold mb-2 text-[#242430]'>Looking For Driver ...</h3>
        <div className='flex flex-col gap-2 items-center justify-between '>
            <img className='h-20' src={vehicleIcon} alt="Icon of a vehicle" />
            <div className='w-full'>
                {/* =================================================== PICKUP ========================================================= */}
                <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className=" text-lg ri-map-pin-3-line"></i>
                <div>
                    <h3 className='text-lg font-semibold'>123/99-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
                </div>
                </div>
                {/* =================================================== DROP ========================================================= */}
                <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className=" text-lg ri-map-pin-4-line"></i>
                <div>
                    <h3 className='text-lg font-semibold'>200/36-F</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
                </div>
                </div>
                {/* =================================================== MONEY ========================================================= */}
                <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className=" text-lg ri-cash-line"></i>
                <div>
                    <h3 className='text-lg font-semibold'>₹{props.fare[props.vehicleType]}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                </div>
                </div>

            </div>
        </div>
    </div>  
  )
}

export default LookingForDriver
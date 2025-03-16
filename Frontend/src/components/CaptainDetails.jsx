import React, {useContext} from 'react'
import {CaptainDataContext} from '../context/CaptainContext'
import pfp from '../assets/atulPFP.jpg'
import ToggleSwitch from "../components/ToggleSwitch"; 

const   CaptainDetails = ({ handleUpdateLocationClick, isTrackingEnabled }) => {

    const { captain } = useContext(CaptainDataContext);

return (
    <div className='h-1/2 px-4 py-2 '>
        <div className='flex items-center justify-between border-gray-600 border-b-2 p-2'>
        <img className='h-16 rounded-full' src={pfp} alt="" />
        <ToggleSwitch onToggle={handleUpdateLocationClick} isOn={isTrackingEnabled}/>
        <div className='text-right'>
        <h2 className='text-lg text-[#F7F7F9] font-bold'>{captain.fullname.firstname+" "+captain.fullname.lastname}</h2>
        <h4 className='text-xl text-[#F7F7F9]  font-semibold -mt-1 -mb-1 uppercase'>{captain.vehicle.plate}</h4>
        <p className='text-sm text-gray-300'>Swift Dzire</p>                  
        </div>
        </div>
                    
        <div className='flex mt-5'>                          
        <div className='w-full grid grid-cols-2 grid-rows-2 gap-2 p-4'>
          {/* =================================================== Online Time ========================================================= */}
            <div className='flex items-center gap-5 px-2 py-4 border-b-2 border-r-2 bg-gray-100 rounded-md'>
            <i className=" text-lg ri-time-line"></i>
            <div>
                <h3 className='text-lg font-semibold'>45.6 hrs</h3>
                <p className='text-xs -mt-1 text-gray-600'>Hours online</p>
            </div>
            </div>
            {/* =================================================== DISTANCE TRAVELLED ========================================================= */}
            <div className='flex items-center gap-5 px-2 py-4 border-b-2 border-r-2 bg-gray-100 rounded-md'>
            <i className=" text-lg ri-steering-2-line"></i>
            <div>
                <h3 className='text-lg font-semibold'>326.1 KM</h3>
                <p className='text-xs -mt-1 text-gray-600'>Distance driven</p>
            </div>
            </div>
            {/* =================================================== EARNINGS ========================================================= */}
            <div className='flex items-center gap-5 px-2 py-4 border-b-2 border-r-2 bg-gray-100 rounded-md'>
            <i className=" text-xl  text-[#1C8147] ri-money-rupee-circle-line"></i>
            <div>
                <h3 className='text-lg  font-semibold'>₹2803.20</h3>
                <p className='text-xs -mt-1 text-gray-600'>Earned</p>
            </div>
            </div>
            {/* =================================================== RATING ========================================================= */}
            <div className='flex items-center gap-5 px-2 py-4 border-b-2 border-r-2 bg-gray-100 rounded-md'>
            <i className=" text-2xl text-[#EFBE1D] ri-star-half-s-line"></i>
            <div>
                <h3 className='text-lg font-semibold'>4.3</h3>
                <p className='text-xs -mt-1 text-gray-600'>Current Rating</p>
            </div>
            </div>          
        </div>
        
        </div>
    </div>
)
}

export default CaptainDetails
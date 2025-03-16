import React, { useState } from 'react'
import upfp from '../assets/diyaPFP.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ConfirmRidePopUp = (props) => {

const [otp, setOtp] = useState('')
const totalfare = props.ride?.fare
const earn = Math.round(totalfare*0.35)
const platformFee = Math.round(totalfare*0.25)
const fare = Math.round(totalfare - earn - platformFee) 
const navigate = useNavigate()

const submitHandler = async (e) => {
    e.preventDefault();   

    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 200) {
            // console.log(" Ride started successfully:", response.data);
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
            // if (!props.ride) {
            //     console.error(" props.ride is undefined in ConfirmRidePopUp!");
            //     return;
            // }
            navigate('/captain-riding', { state: { ride: props.ride } });
        } else {
            alert(" Incorrect OTP! Please try again.");
        }
    } catch (error) {
        console.error(" Error in starting ride:", error.response?.data || error.message);
        alert(" Failed to start ride. Please try again.");
    }
};

return (
<div >
    <div className=''>
        <h5 onClick={() => {
                    props.setConfirmRidePopup(false)
                }}
            className='absolute my-2 px-1 py-2 w-[90%] text-center top-0'><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className='my-5 p-2 text-lg font-bold'>Confirm this ride to Start</h4>
    </div>    
    {/* =================================================== USER INFO ========================================================= */}
    <div className='flex items-center justify-between border-gray-600 border-b-2 p-2'>
        <div className='flex items-center gap-3 '>  
            <div className='flex items-center justify-between gap-2 '>
                <img className='h-16 rounded-full' src={upfp} alt="" />
                <div className='text-right'>
                    <h4 className='text-lg font-bold uppercase'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h4>                                     
                </div>
            </div>       
        </div>
        {/* =================================================== DISTANCE ========================================================= */}
        <h5 className='text-xl text-[#F7F7F9] font-bold bg-[c] px-2 py-1 rounded-md '>{props.ride?.distance}kms</h5>
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
    <div className='flex flex-col w-full justify-between items-center gap-5 p-3 border-b-2'>
            <div className='flex w-full justify-between'>
                <p className='text-sm text-gray-600'>Fare</p>
                <p className='text-sm text-gray-600'>₹{fare}</p>
            </div>
            <div className='flex w-full justify-between'>
                <p className='text-sm text-gray-600'>Platform Fee</p>
                <p className='text-sm text-gray-600'>₹{platformFee}</p>
            </div>
            <div className='flex w-full justify-between'>
                <p className='text-sm text-gray-600'>Your Earning</p>
                <p className='text-sm text-gray-600'>₹{earn}</p>
            </div>
            <div className='flex w-full justify-between font-bold '>                
                <p className='text-lg'><i className=" text-lg ri-cash-line"></i>Total</p>
                <p className='text-lg'>₹{totalfare}</p>
        </div>
    </div>
    <div>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            {/*============================================    OTP      ========================================================================= */}
            <div className='flex flex-col w-full justify-between items-center gap-5 p-3 border-b-2'>
                    <input 
                        value={otp}
                        onChange={(e)=>{setOtp(e.target.value)}}
                        type='number' 
                        className='bg-[#F7F7F9] rounded-md px-4 py-2  border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base placeholder:font-mono' 
                        placeholder='Enter OTP'                 
                    />
                
            </div>
            {/* =================================================== BUTTONS  ========================================================= */}
            <div className='relative flex justify-center w-full items-center pt-4 gap-2'>        
                <button
                    onClick={()=>{
                        props.setRidePopupPanel(false)
                        props.setConfirmRidePopupPanel(false)
                    }}
                    className='flex justify-center items-center w-2/3 text-[#F7F7F9] font-semibold py-2 rounded-md bg-[#A44720] active:scale-[99%] transition-transform duration-100'>CANCEL</button>
                <button
                    onClick={(e) => submitHandler(e)}
                    className='flex justify-center items-center w-2/3 text-[#F7F7F9] font-semibold py-2 rounded-md bg-[#1C8147] active:scale-[99%] transition-transform duration-100'>
                    CONFIRM
                </button>
            </div>
        </form>
    </div>
</div>
  )
}

export default ConfirmRidePopUp
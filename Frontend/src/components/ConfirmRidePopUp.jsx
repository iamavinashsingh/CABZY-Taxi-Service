import React, { useState } from 'react'
import upfp from '../assets/diyaPFP.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')
  const totalfare = props.ride?.fare
  const earn = Math.round(totalfare * 0.35)
  const platformFee = Math.round(totalfare * 0.25)
  const fare = Math.round(totalfare - earn - platformFee)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: { rideId: props.ride._id, otp: otp },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate('/captain-riding', { state: { ride: props.ride } });
      } else {
        alert("Incorrect OTP! Please try again.");
      }
    } catch (error) {
      console.error("Error in starting ride:", error.response?.data || error.message);
      alert("Failed to start ride. Please try again.");
    }
  };

  return (
    <div className='h-full flex flex-col'>
      <div className='sheet-handle mt-2' />
      <h5 onClick={() => props.setConfirmRidePopup(false)}
        className='absolute top-4 right-5 text-[#86868b] cursor-pointer hover:text-[#1d1d1f] transition-colors'>
        <i className="text-2xl ri-close-line"></i>
      </h5>

      <h4 className='text-[22px] font-semibold text-[#1d1d1f] mt-3 mb-5'>Verify & Start</h4>

      {/* User card */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-2xl object-cover' src={upfp} alt="User" />
          <h4 className='text-[16px] font-semibold text-[#1d1d1f] capitalize'>
            {props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}
          </h4>
        </div>
        <div className='bg-[#0066cc] text-white text-[13px] font-bold px-3 py-1 rounded-xl'>
          {props.ride?.distance}kms
        </div>
      </div>

      {/* Route */}
      <div className='bg-[#f5f5f7] rounded-2xl p-3 space-y-0'>
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
      </div>

      {/* Fare breakdown */}
      <div className='mt-4 space-y-2.5'>
        <div className='flex justify-between'>
          <span className='text-[14px] text-[#86868b]'>Base fare</span>
          <span className='text-[14px] text-[#86868b]'>₹{fare}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-[14px] text-[#86868b]'>Platform fee</span>
          <span className='text-[14px] text-[#86868b]'>₹{platformFee}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-[14px] text-[#86868b]'>Your earning</span>
          <span className='text-[14px] text-[#0066cc] font-semibold'>₹{earn}</span>
        </div>
        <div className='divider' />
        <div className='flex justify-between'>
          <span className='text-[16px] font-semibold text-[#1d1d1f]'>Total</span>
          <span className='text-[16px] font-semibold text-[#1d1d1f]'>₹{totalfare}</span>
        </div>
      </div>

      {/* OTP */}
      <form onSubmit={(e) => submitHandler(e)} className='mt-auto'>
        <div className='mt-5 mb-4'>
          <label className='text-[12px] font-medium text-[#86868b] uppercase tracking-wider mb-2 block text-center'>Enter ride OTP</label>
          <input
            value={otp} onChange={(e) => setOtp(e.target.value)}
            type='number'
            className='input-premium text-center font-mono tracking-[0.3em] text-[22px] font-bold'
            placeholder='• • • •'
            autoComplete="one-time-code"
          />
        </div>
        <div className='flex gap-3'>
          <button type='button'
            onClick={() => { props.setRidePopupPanel(false); props.setConfirmRidePopupPanel(false); }}
            className='btn-ghost flex-1'>
            Cancel
          </button>
          <button type='submit' onClick={(e) => submitHandler(e)}
            className='btn-hero flex-1'>
            Start Ride
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConfirmRidePopUp
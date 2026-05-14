import React, { useRef, useState } from 'react'
import locImg from '../assets/Driver-Map.jpg'
import { Link, useLocation } from 'react-router-dom'
import cabzyIcon from '../assets/Cabzy-FullLogo.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation();
  const rideData = location.state?.ride

  useGSAP(function () {
    if (finishRidePanel) { gsap.to(finishRidePanelRef.current, { transform: 'translateY(0)' }) }
    else { gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)' }) }
  }, [finishRidePanel])

  return (
    <div className='h-screen bg-black'>
      {/* Header */}
      <div className='fixed z-20 top-0 left-0 right-0 h-[52px] glass-dark flex items-center justify-between px-5'>
        <img className='w-14' src={cabzyIcon} alt="Cabzy" />
        <Link to='/captain-home' className='w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/15 transition-all'>
          <i className="text-[15px] text-white/70 ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map */}
      <div className='h-[70%] w-screen pt-[52px]'>
        <LiveTracking />
      </div>

      {/* Ride bar */}
      <div className='h-[30%] bg-[#0a0a0a] rounded-t-[28px] -mt-6 relative z-10 flex flex-col justify-between p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-[#2997ff]/15 flex items-center justify-center'>
              <i className="text-[#2997ff] ri-timer-fill"></i>
            </div>
            <div>
              <p className='text-[12px] text-white/40 uppercase tracking-wider'>Duration</p>
              <span className='text-[17px] font-semibold text-white'>{rideData?.duration} Mins</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-xl bg-[#2997ff]/15 flex items-center justify-center'>
              <i className="text-[#2997ff] ri-pin-distance-line"></i>
            </div>
            <div>
              <p className='text-[12px] text-white/40 uppercase tracking-wider'>Distance</p>
              <span className='text-[17px] font-semibold text-white'>{rideData?.distance} kms</span>
            </div>
          </div>
        </div>
        <p className='text-[12px] text-white/30 text-center truncate'>Ride ID: {rideData?._id}</p>
        <button onClick={() => setFinishRidePanel(true)} className='btn-hero w-full'>
          Complete Ride
        </button>
      </div>

      {/* Finish Ride Panel */}
      <div ref={finishRidePanelRef} className='fixed bottom-0 h-screen w-full translate-y-full z-50 bg-white px-6 py-8'>
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
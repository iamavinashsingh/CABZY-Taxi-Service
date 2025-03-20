import React, { useRef, useState , useEffect} from 'react'
import locImg from '../assets/Driver-Map.jpg'
import { Link, useLocation } from 'react-router-dom'
import cabzyIcon from '../assets/Cabzy-FullLogo.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'


const CaptainRiding = () => {
    const [ finishRidePanel, setFinishRidePanel ] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation();
    const rideData = location.state?.ride

    // console.log("📢 Received ride data in CaptainRiding:", rideData);


    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ finishRidePanel ])

    return (
        <div className='h-screen '>
            {/*====================================  HEADER ======================================================== */}
            <div className='fixed  p-3 top-0 flex items-center justify-between w-full'>
                <img className='w-16' src={cabzyIcon} alt="" />
                <Link to='/captain-home' className='h-10 w-10 flex items-center justify-center bg-[#242430] rounded-full cursor-pointer'>
                    <i className="text-xl font-semibold text-[#F7F7F9] ri-logout-box-r-line"></i>
                </Link>
            </div>
            {/*====================================  MAP BG  ======================================================== */}
            <div className='h-3/4 w-screen'>
                {/* <img className='h-full w-full object-cover' src={locImg} alt="" /> */}
                <LiveTracking />
            </div>
            {/*====================================   RIDE  INFO  ======================================================== */}
            <div  className='h-1/4 z-999 flex flex-col justify-between items-center p-4 bg-gradient-to-br from-[#4B4B55] via-[#373843] to-[#4B4B55] '>
                <h4 className=' p-1 w-[90%] text-center top-2 text-[#F7F7F9] '><span className='font-bold'>Ride Id:</span> {rideData?._id}</h4>
                <div className='flex items-center justify-between w-[90%]'>
                    <h4 className='text-[#F7F7F9] font-bold'><i className="text-[#F7F7F9] text-lg  ri-timer-fill"></i>{rideData?.duration}Mins</h4>
                    <h4 className='text-[#F7F7F9] font-bold'><i className="text-[#F7F7F9] text-lg ri-pin-distance-line "></i> {rideData?.distance} kms</h4>
                </div>                
                <button onClick={() => { setFinishRidePanel(true) }} className='flex w-full uppercase justify-center items-center text-[#F7F7F9] my-2 font-bold py-2 px-3 rounded-md bg-[#A44720] active:scale-[98%] transition-transform duration-100 '>Complete Ride</button>
            </div>
            {/*==================================== PANELS ======================================================== */}
            <div ref={finishRidePanelRef} className='fixed  bottom-0 h-screen w-full translate-y-full  px-3 py-6  bg-[#F7F7F9]'>
                <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}

export default CaptainRiding
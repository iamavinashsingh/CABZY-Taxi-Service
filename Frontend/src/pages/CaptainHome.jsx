import React, { useRef, useState , useContext , useEffect} from 'react'
import locImg from '../assets/Driver-Map.jpg'
import { Link } from 'react-router-dom'
import cabzyIcon from '../assets/Cabzy-FullLogo.png'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'






function CaptainHome() {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ ride, setRide ] = useState(null)
  const [watchId, setWatchId] = useState(null);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

  const confirmRidePopupRef = useRef(null)
  const ridePopupPanelRef = useRef(null)
  

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  // Again changing from here 

  const updateLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log("📍 Updating Captain Location:", position.coords);
            socket.emit('update-location-captain', {
                userId: captain._id,
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        });
    }
};


  // Function to start tracking location when user clicks the button
  const handleUpdateLocationClick = () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        updateLocation,
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
      setWatchId(id);
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  // Cleanup function when the component unmounts
  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });

    socket.on("new-ride", (data) => {
      setRide(data);
      setRidePopupPanel(true);
    });

    return () => {
      socket.off("new-ride");
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [socket, captain, watchId]);

// CONFIRM RIDE FUNCTION 
async function confirmRide() {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  setRidePopupPanel(false)
  setConfirmRidePopupPanel(true)
}



  useGSAP(function(){
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(ridePopupPanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[ridePopupPanel])

  useGSAP(function(){
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(confirmRidePopupRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[confirmRidePopupPanel])


  return (
<div className='h-screen'>
      {/*====================================  HEADER ======================================================== */}
      <div className='fixed  p-3 top-0 flex items-center justify-between w-full'>
        <img className='w-16' src={cabzyIcon} alt="" />
        <Link to='/captain-login' className='h-10 w-10 flex items-center justify-center bg-[#242430] rounded-full cursor-pointer'>
          <i className="text-xl font-semibold text-[#F7F7F9] ri-logout-box-r-line"></i>
        </Link>
      </div>
      {/*====================================  MAP BG  ======================================================== */}
      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src={locImg} alt="" />
      </div>
      {/*====================================  DRIVER INFO  ======================================================== */}
    <div className='h-1/2   bg-gradient-to-br from-[#4B4B55] via-[#373843] to-[#4B4B55] '>
        <CaptainDetails  handleUpdateLocationClick={handleUpdateLocationClick} 
        isTrackingEnabled={isTrackingEnabled} />
      </div>
      {/*====================================  RIDE POP UP  ======================================================== */}
      <div ref={ridePopupPanelRef} className='fixed  bottom-0 w-full translate-y-full  px-3 py-6  bg-[#F7F7F9]'>
        <RidePopUp 
        ride={ride}  confirmRide={confirmRide}
        setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      {/*==================================== CONFIRM RIDE POP UP  ======================================================== */}
      <div ref={confirmRidePopupRef} className='fixed  bottom-0 h-screen w-full translate-y-full  px-3 py-6  bg-[#F7F7F9]'>
        <ConfirmRidePopUp 
        ride={ride}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div> 
</div>

  )
}

export default CaptainHome
import React, { useRef, useState, useContext, useEffect } from 'react'
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
import LiveTracking from '../components/LiveTracking' 


function CaptainHome() {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)
  const [watchId, setWatchId] = useState(null);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);

  const confirmRidePopupRef = useRef(null)
  const ridePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  const updateLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            socket.emit('update-location-captain', {
                userId: captain._id,
                location: { lat: position.coords.latitude, lng: position.coords.longitude }
            });
        });
    }
  };

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

  useEffect(() => {
    socket.emit("join", { userId: captain._id, userType: "captain" });
    socket.on("new-ride", (data) => {
      setRide(data);
      setRidePopupPanel(true);
    });
    return () => {
      socket.off("new-ride");
      if (watchId) { navigator.geolocation.clearWatch(watchId); }
    };
  }, [socket, captain, watchId]);

  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id, captainId: captain._id,
    }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  useGSAP(function(){
    if(ridePopupPanel){ gsap.to(ridePopupPanelRef.current,{ transform: 'translateY(0)' }) }
    else{ gsap.to(ridePopupPanelRef.current,{ transform: 'translateY(100%)' }) }
  },[ridePopupPanel])

  useGSAP(function(){
    if(confirmRidePopupPanel){ gsap.to(confirmRidePopupRef.current,{ transform: 'translateY(0)' }) }
    else{ gsap.to(confirmRidePopupRef.current,{ transform: 'translateY(100%)' }) }
  },[confirmRidePopupPanel])

  return (
    <div className='h-screen bg-black'>
      {/* Header - glass nav */}
      <div className='fixed z-20 top-0 left-0 right-0 h-[52px] glass-dark flex items-center justify-between px-5'>
        <img className='w-14' src={cabzyIcon} alt="Cabzy" />
        <Link to='/captain-login' 
          className='w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/15 transition-all'>
          <i className="text-[15px] text-white/70 ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map */}
      <div className='h-[55%] pt-[52px]'>
        <LiveTracking />
      </div>

      {/* Dashboard */}
      <div className='h-[45%] bg-[#0a0a0a] rounded-t-[28px] -mt-6 relative z-10'>
        <CaptainDetails handleUpdateLocationClick={handleUpdateLocationClick} 
          isTrackingEnabled={isTrackingEnabled} />
      </div>

      {/* Ride Pop Up */}
      <div ref={ridePopupPanelRef} className='bottom-sheet translate-y-full'>
        <RidePopUp ride={ride} confirmRide={confirmRide}
          setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>

      {/* Confirm Ride Pop Up */}
      <div ref={confirmRidePopupRef} className='fixed bottom-0 h-screen w-full translate-y-full z-50 bg-white px-6 py-8'>
        <ConfirmRidePopUp ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div> 
    </div>
  )
}

export default CaptainHome
import React, { useState, useRef, useEffect, useContext } from 'react'
import myLogo from '../assets/Cabzy-Logo.png'
import mapBg from '../assets/Taxi-Map.jpg'
import arrows from '../assets/navigate.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import axios from 'axios';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';


function Home() {
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const bgRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)  
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
 
  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {    
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    console.log("ride")
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } }) 
  })

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
        const userLat = 28.6448;
        const userLng = 77.2167;
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value, latitude: userLat, longitude: userLng },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPickupSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
        const userLat = 28.6448;
        const userLng = 77.2167;
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value, latitude: userLat, longitude: userLng },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setDestinationSuggestions(response.data || []);
    } catch(error) {
      console.error("Error fetching suggestions:", error);
    }
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{ height:'70%', opacity:1, padding:20 })
      gsap.to(panelCloseRef.current,{ opacity:1 })
      gsap.to(bgRef.current,{ height: screen.height })
    } else {
      gsap.to(panelRef.current,{ height:0, opacity:0, padding:0 })
      gsap.to(panelCloseRef.current,{ opacity:0 })
      gsap.to(bgRef.current,{ height: '37 %' })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel){ gsap.to(vehiclePanelRef.current,{ transform: 'translateY(0%)' }) }
    else{ gsap.to(vehiclePanelRef.current,{ transform: 'translateY(100%)' }) }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){ gsap.to(confirmRidePanelRef.current,{ transform: 'translateY(0%)' }) }
    else{ gsap.to(confirmRidePanelRef.current,{ transform: 'translateY(100%)' }) }
  },[confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound){ gsap.to(vehicleFoundRef.current,{ transform: 'translateY(0%)' }) }
    else{ gsap.to(vehicleFoundRef.current,{ transform: 'translateY(100%)' }) }
  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriver){ gsap.to(waitingForDriverRef.current,{ transform: 'translateY(0%)' }) }
    else{ gsap.to(waitingForDriverRef.current,{ transform: 'translateY(100%)' }) }
  },[waitingForDriver])

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)
    try {
        const pickupResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
            params: { address: pickup },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const destinationResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
            params: { address: destination },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const pickupCoords = pickupResponse.data;
        const destinationCoords = destinationResponse.data;
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { 
                pickup: `${pickupCoords.lat},${pickupCoords.lng}`, 
                destination: `${destinationCoords.lat},${destinationCoords.lng}`
            },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFare(response.data);
    } catch (error) {
        console.error("Error in findTrip:", error);
    }
  }

  async function createRide() {
    try {
      console.log("Creating ride with:", pickup, destination, vehicleType);
      const pickupResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
        params: { address: pickup },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const destinationResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
        params: { address: destination },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const pickupCoords = pickupResponse.data;
      const destinationCoords = destinationResponse.data;
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup: `${pickupCoords.lat},${pickupCoords.lng}`, destination: `${destinationCoords.lat},${destinationCoords.lng}`, vehicleType },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setRide(response.data);
      console.log("Ride created:", response.data);
    } catch (error) {
      console.error("Error in createRide:", error.response?.data || error.message);
    }
  }

  return (
    <div className='relative h-screen overflow-hidden bg-[#f5f5f7]'> 
      {/* Map */}
      <div className='h-full w-screen'>
        <LiveTracking width="100%" height="500px" />  
      </div>

      {/* Floating logo */}
      <div className='absolute top-5 left-5 z-10'>
        <div className='w-10 h-10 rounded-xl bg-white/80 backdrop-blur-xl shadow-lg flex items-center justify-center'>
          <img className='w-6' src={myLogo} alt="Cabzy" />
        </div>
      </div>

      {/* Search Panel at bottom */}
      <div ref={bgRef} className='absolute w-full bottom-0 flex flex-col justify-end'>  
        <div className='glass-dark rounded-t-[28px] p-5 relative'>
          <h5 ref={panelCloseRef} 
            onClick={() => setPanelOpen(false)} 
            className='absolute opacity-0 top-3 right-5 text-2xl text-white/60 cursor-pointer z-10 hover:text-white transition-colors'>
            <i className="ri-close-line"></i>
          </h5>
          
          <h4 className='text-[20px] font-semibold text-white mb-1'>Where to?</h4>
          <p className='text-white/40 text-[13px] mb-4'>Plan your trip</p>
          
          <form onSubmit={(e) => submitHandler(e)}>
            <div className='relative flex flex-col gap-3'>
              {/* Route line */}
              <div className='absolute left-[17px] top-[20px] bottom-[20px] w-[2px] bg-white/10 z-0' />
              <div className='absolute left-[13px] top-[16px] w-[10px] h-[10px] rounded-full bg-[#2997ff] z-10 shadow-lg shadow-blue-500/30' />
              <div className='absolute left-[13px] bottom-[16px] w-[10px] h-[10px] rounded-full bg-white z-10' />
              
              <input
                onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
                value={pickup} onChange={handlePickupChange}
                type="text" placeholder="Pickup location"             
                className='input-premium-dark pl-9'
              />
              <input
                onClick={() => { setPanelOpen(true); setActiveField('destination') }}
                value={destination} onChange={handleDestinationChange}
                type="text" placeholder="Where are you going?"
                className='input-premium-dark pl-9'
              />
            </div>
          </form>
          <button onClick={findTrip} className='btn-hero w-full mt-4'>
            Find Trip
          </button>
        </div>

        {/* Location Search */}
        <div ref={panelRef} className='h-0 bg-[#1a1a1c]'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}
            setPickup={setPickup} setDestination={setDestination} activeField={activeField}/>
        </div>  
      </div>
    
      {/* Vehicle Panel */}
      <div ref={vehiclePanelRef} className='bottom-sheet translate-y-full py-6'>
        <VehiclePanel 
          setVehicle={setVehicleType} fare={fare} 
          setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />
      </div>
    
      {/* Confirm Ride */}
      <div ref={confirmRidePanelRef} className='bottom-sheet translate-y-full'>
        <ConfirmRide 
          pickup={pickup} destination={destination} vehicleType={vehicleType} 
          createRide={createRide} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
    
      {/* Looking For Driver */}
      <div ref={vehicleFoundRef} className='bottom-sheet translate-y-full'>
        <LookingForDriver
          pickup={pickup} destination={destination} vehicleType={vehicleType}
          createRide={createRide} fare={fare} setVehicleFound={setVehicleFound} />
      </div> 
    
      {/* Waiting For Driver */}
      <div ref={waitingForDriverRef} className='bottom-sheet translate-y-full z-[999] pt-8'>
        <WaitingForDriver 
          ride={ride} waitingForDriver={waitingForDriver}
          setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver} />
      </div>      
    </div>  
  )
}

export default Home
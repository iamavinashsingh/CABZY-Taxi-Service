import React, { useState , useRef ,  useEffect ,  useContext } from 'react'
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
  // all the REFs 
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const bgRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  // all the STATES
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)  
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [ waitingForDriver, setWaitingForDriver ] = useState(false)
  const [activeField, setActiveField] = useState(null);
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)
 

  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  

  // Socket context is used to emit events
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
}, [ user ])
// console.log(user)
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

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault()
  }

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    
    try {
        // Get user's current latitude & longitude
        const userLat = 28.6448;   // Example latitude (Replace with actual location)
        const userLng = 77.2167;   // Example longitude (Replace with actual location)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: {
                input: e.target.value,
                latitude: userLat,   // Pass latitude
                longitude: userLng   // Pass longitude
            },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        // console.log(response.data)
        setPickupSuggestions(response.data || []);
    } catch (error) {
      
      console.error("Error fetching suggestions:", error);
    }
};


const handleDestinationChange = async (e) => {
  setDestination(e.target.value)
  try {
        const userLat = 28.6448;   // Example latitude (Replace with actual location)
        const userLng = 77.2167;
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
      params: {
          input: e.target.value,
          latitude: userLat,   // Pass latitude
          longitude: userLng   // Pass longitude
      },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
      // console.log(response.data)
      setDestinationSuggestions(response.data|| []); // ✅ Fixed data structure issue
  } catch(error) {
    console.error("Error fetching suggestions:", error);
  }
}
  // Panel GSAP : For choosing Location
  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        opacity:1,
        padding:20,
      })
      gsap.to(panelCloseRef.current,{
        opacity:1,
      })
      gsap.to(bgRef.current,{
        height: screen.height,
      })
    }
    else{
      gsap.to(panelRef.current,{
        height:0,
        opacity:0,
        padding:0,
      })
      gsap.to(panelCloseRef.current,{
        opacity:0,
      })
      gsap.to(bgRef.current,{
        height: '37 %',
      })
    }
  },[panelOpen])

  // Vehicle Panel GSAP : For choosing Ride
  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(0%)'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehiclePanel])

  // Confirm Ride GSAP
  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(0%)'
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[confirmRidePanel])

  // Vehicle Found GSAP
  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(0%)'
      })
    }
    else{
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehicleFound])

  // Waiting For Driver GSAP
  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(0%)'
      })
    }
    else{
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[waitingForDriver])



  //================================ FUNCTION TO FIND A TRIP =================================


  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)
    try {

        // 1️⃣ **Get Coordinates for Pickup**
        const pickupResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
            params: { address: pickup },  // Sending city name
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });



        // 2️⃣ **Get Coordinates for Destination**
        const destinationResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
            params: { address: destination },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });



        // 3️⃣ **Extract Latitude & Longitude**
        const pickupCoords = pickupResponse.data; // { lat: 26.9124, lng: 75.7873 }
        const destinationCoords = destinationResponse.data;  // { lat: 26.9124, lng: 75.7873 }



        // 4️⃣ **Now Call Get Fare API with Coordinates**
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { 
                pickup: `${pickupCoords.lat},${pickupCoords.lng}`, 
                destination: `${destinationCoords.lat},${destinationCoords.lng}`
            },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        setFare(response.data); // Set fare details
    } catch (error) {
        console.error("Error in findTrip:", error);
    }
}


  //================================ FUNCTION TO CREATE A RIDE =================================

  async function createRide() {
    try {
      console.log("Creating ride with:", pickup, destination, vehicleType);
      // 1️⃣ Get Coordinates for Pickup
      const pickupResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
        params: { address: pickup },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
  
      // 2️⃣ Get Coordinates for Destination
      const destinationResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
        params: { address: destination },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
  
      // 3️⃣ Extract Coordinates
      const pickupCoords = pickupResponse.data;
      const destinationCoords = destinationResponse.data;
  
      // 4️⃣ Create Ride with Coordinates
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup: `${pickupCoords.lat},${pickupCoords.lng}`,
          destination: `${destinationCoords.lat},${destinationCoords.lng}`,
          vehicleType
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
  
      setRide(response.data);
      console.log("Ride created:", response.data);
    } catch (error) {
      console.error("Error in createRide:", error.response?.data || error.message);
    }
  }



  return (
    <div className='relative h-screen overflow-hidden'> 
    
    {/*================================================== Home BG ===================================================== */}
    
    <img className='w-28 absolute left-5 top-5 z-1' src={myLogo} alt="logo of Cabzy"  />
    <div className='h-2/3 w-screen'>
        {/* <img className='h-screen w-full' src={mapBg} alt="A map with cabs scattering in different positions" /> */}
        <LiveTracking width="100%" height="500px" />  
        
    </div>
    
    {/*================================================== Pickup-Destination  Panel ===================================================== */}
    
    <div ref={bgRef} className='absolute  w-full bottom-0  flex flex-col justify-end bg-gradient-to-br from-[#4B4B55] via-[#373843] to-[#4B4B55]  '>  
        <div className=' p-5 relative '>
          <h5 ref={panelCloseRef} 
            onClick={()=> setPanelOpen(false)} 
            className='absolute opacity-0 top-2 right-2 text-2xl text-[#F7F7F9]'><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-xl text-[#F7F7F9] font-bold'>Find a trip</h4>
          <form 
            onSubmit={(e) => {
              submitHandler(e)
            }} 
          > 
            <img className="absolute h-16 top-[33%] left-[10%]" src={arrows} alt="" />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('pickup')
            }}
              value={pickup}
              onChange={handlePickupChange}
              type="text" 
              placeholder="Add a pickup Location"             
              className='bg-[#F7F7F9] rounded-md px-12 py-2 mt-5 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            />
            <input
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
            }}
              value={destination}
              onChange={handleDestinationChange}
              type="text" 
              placeholder="Enter your destination"
              className='bg-[#F7F7F9] rounded-md px-12 py-2 mt-3 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'         
            />
          </form>
          <button onClick={findTrip}
            className='bg-[#242430] rounded-md px-4 py-2 mt-4 mb-2 w-full text-lg text-[#F7F7F9] font-bold active:scale-[99%] transition-transform duration-100'>Find Trip</button>
        </div>

    {/*============================================ Location Search Panel======================================================= */}

    <div ref={panelRef} className='h-0'>
      <LocationSearchPanel
        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
        setPanelOpen={setPanelOpen}
        setVehiclePanel={setVehiclePanel}
        setPickup={setPickup}
        setDestination={setDestination}
        activeField={activeField}/>
        </div>  
    </div>
    
    {/*============================================ Vehicle Choose Panel======================================================= */}
    
    <div ref={vehiclePanelRef} className='chooseRide fixed z-10 bottom-0 w-full translate-y-full px-3 py-10 bg-[#F7F7F9]'>
        <VehiclePanel 
          setVehicle={setVehicleType}
          fare={fare} setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel}   />
    </div>
    
    {/*============================================ Confirm Ride Panel======================================================= */}
    
    <div ref={confirmRidePanelRef} className='confirmRide fixed z-10 bottom-0 w-full translate-y-full px-3 py-6  bg-[#F7F7F9]'>
        <ConfirmRide 
        pickup={pickup} destination={destination} vehicleType={vehicleType} 
        createRide={createRide} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}  />
    </div>
    
    {/*============================================ Looking For Driver Panel======================================================= */}
    <div ref={vehicleFoundRef} className='lookingForDriver fixed  z-10  bottom-0 w-full translate-y-full px-3 py-6 bg-[#F7F7F9]'>
        <LookingForDriver
        pickup={pickup} destination={destination} vehicleType={vehicleType}
        createRide={createRide} fare={fare} 
        setVehicleFound={setVehicleFound} />
    </div> 
    
    {/*============================================ Waiting For Driver Panel======================================================= */}
    <div ref={waitingForDriverRef} className='waitingForDriver fixed z-[999] bottom-0 w-full translate-y-full px-3 py-6 pt-12 bg-[#F7F7F9]'>
        <WaitingForDriver 
        ride={ride}  waitingForDriver={waitingForDriver}
        setVehicleFound={setVehicleFound}
        setWaitingForDriver={setWaitingForDriver}         />
    </div>      
    
    </div>  
  )
}

export default Home
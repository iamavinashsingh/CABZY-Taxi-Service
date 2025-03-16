import React, { useState } from 'react'
import myLogo from '../assets/Cabzy-FullLogo.png'
import { Link , useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignUp = () => {

  const navigate = useNavigate()

  // use state to store the user input
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({})

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')

 
  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) =>{
    // write the code to submit the form
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
        model: vehicleModel
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
    setVehicleModel('')
  }


  return (
    <div className='p-7 flex flex-col justify-between h-screen bg-[#F7F7F9] overflow-hidden'>
      <div>
        <img src={myLogo}  alt="Logo of Cabzy" className='w-20 mb-5' />
        <form onSubmit={(e)=>{          
          submitHandler(e)
        }} >
        {/* ============================================== CAPTAIN'S NAME ============================================== */} 
          <h3 className='text-base text-[#242430] font-medium mb-2'>What's your name</h3>
          <div className='flex space-x-2 mb-4'>
            <input
              required
              value={firstName}
              onChange = {(e) => {
                setFirstName(e.target.value)
              }}
              className='bg-[#F7F7F9] rounded-md px-4 py-2 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
                type="text" 
                placeholder='First Name'
            />
            <input
              value={lastName}
              onChange = {(e) => {
                setLastName(e.target.value)
              }}
              className='bg-[#F7F7F9] rounded-md px-4 py-2 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
              type="text" 
              placeholder='Last Name'
            />

          {/* ============================================== CAPTAIN'S EMAIL & PASSWORD ============================================== */} 

          </div>
          <h3 className='text-base text-[#242430] font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange = {(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#F7F7F9] rounded-md px-4 py-2 mb-4 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            type="email" 
            placeholder='example@email.com'
          />
          <h3 className='text-base text-[#242430] font-medium  mb-2'>Enter Password</h3>        
          <input 
            required
            value={password}
            onChange = {(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[hsl(240,14%,97%)] rounded-md px-4 py-2 mb-4 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            type="password"
            placeholder='password'/>

          {/* ============================================== VEHICLE'S INFORMATION ============================================== */} 

          <h3 className='text-base text-[#242430] font-medium mb-2'>Vehicle Information</h3>
          <div className='mb-4'>
          <input
            required
            value={vehicleModel}
            onChange={(e) => {
              setVehicleModel(e.target.value)
            }}
            className='bg-[#F7F7F9] rounded-md px-4 py-2 mb-2 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            type="text"
            placeholder='Vehicle Model'
          />
          <div className='flex space-x-2'>          
          <input
            required
            value={vehicleColor}
            onChange={(e) => {
              setVehicleColor(e.target.value)
            }}
            className='bg-[#F7F7F9] rounded-md px-4 py-2 mb-2 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            type="text"
            placeholder='Vehicle Color'
          />
          <input
            required
            value={vehiclePlate}
            onChange={(e) => {
              setVehiclePlate(e.target.value)
            }}
            className='bg-[#F7F7F9] uppercase rounded-md px-4 py-2 mb-2 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            type="text"
            placeholder='Vehicle Plate'
          />
          </div>
          <div className='flex space-x-2'>
            <select
              required
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)}}
              className='bg-[#F7F7F9] rounded-md px-4 py-2 mb-2 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            >
              <option value="" disabled>Vehicle Capacity</option>              
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>

          <select
            required
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value)
            }}
            className='bg-[#F7F7F9] rounded-md px-4 py-2 mb-2 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
          >
            <option value="" disabled>  Vehicle Type</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
            <option value="bike">Bike</option>
          </select>
          </div>
          
          </div>

          <button className='bg-[#242430] rounded-md px-4 py-2 mb-2 w-full text-base text-[#F7F7F9] font-medium active:scale-[99%] transition-transform duration-100 '>Create Captain account</button> 
                  
        </form>
        <p className='text-[#242430] text-center mb-4'>Already have account ? <Link to='/captain-login' className='text-[#EFBE1D] font-semibold'>Login here</Link></p>
        
      </div>  
      <div>
        <p className='text-[7px] text-[#242430] leading-tight'>This site is protected by reCAPTCHA, and the <span className='underline font-semibold'>Google Privacy Policy</span> and <span className='underline font-semibold'>Terms of Service*</span> apply.</p>
      </div>
      
    </div>
  )
}

export default CaptainSignUp
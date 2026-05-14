import React, { useState } from 'react'
import myLogo from '../assets/Cabzy-FullLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import ShaderBackground from '../components/ui/ShaderBackground'

const CaptainSignUp = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({})
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [vehicleModel, setVehicleModel] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor, plate: vehiclePlate,
        capacity: vehicleCapacity, vehicleType: vehicleType, model: vehicleModel
      }
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    setEmail(''); setFirstName(''); setLastName(''); setPassword('')
    setVehicleColor(''); setVehiclePlate(''); setVehicleCapacity(''); setVehicleType(''); setVehicleModel('')
  }

  return (
    <div className='min-h-screen relative flex items-center justify-center p-6 py-10 overflow-hidden'>
      {/* Animated shader background */}
      <ShaderBackground variant="dark" speed={0.5} />

      <div className='glass-dark rounded-[28px] w-full max-w-[440px] p-7 page-enter overflow-y-auto max-h-[90vh] no-scrollbar relative z-10'>
        {/* Logo */}
        <div className='flex justify-center mb-5 scale-in'>
          <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center border border-white/10'>
            <img src={myLogo} alt="Cabzy" className='w-8' />
          </div>
        </div>

        <div className='text-center mb-5 slide-in-bottom stagger-1'>
          <h1 className='text-[24px] font-semibold text-white tracking-tight'>Become a Captain</h1>
          <p className='text-white/40 text-[14px] mt-1'>Drive with Cabzy and earn on your terms</p>
        </div>

        <form onSubmit={(e) => submitHandler(e)} className='space-y-3'>
          {/* Personal info */}
          <div className='flex gap-3 slide-in-bottom stagger-2'>
            <div className='flex-1'>
              <label className='text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1 block'>First name</label>
              <input required id='captain-signup-firstname' value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className='input-premium-dark' type="text" placeholder='John' />
            </div>
            <div className='flex-1'>
              <label className='text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1 block'>Last name</label>
              <input id='captain-signup-lastname' value={lastName} onChange={(e) => setLastName(e.target.value)}
                className='input-premium-dark' type="text" placeholder='Doe' />
            </div>
          </div>

          <div className='slide-in-bottom stagger-3'>
            <label className='text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1 block'>Email</label>
            <input required id='captain-signup-email' value={email} onChange={(e) => setEmail(e.target.value)}
              className='input-premium-dark' type="email" placeholder='you@example.com' />
          </div>

          <div className='slide-in-bottom stagger-3'>
            <label className='text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1 block'>Password</label>
            <input required id='captain-signup-password' value={password} onChange={(e) => setPassword(e.target.value)}
              className='input-premium-dark' type="password" placeholder='Min. 8 characters' />
          </div>

          {/* Vehicle section */}
          <div className='slide-in-bottom stagger-4 pt-2'>
            <div className='border border-white/10 rounded-2xl p-4 space-y-3'>
              <h3 className='text-[14px] font-semibold text-white/80 flex items-center gap-2'>
                <i className="ri-steering-2-line text-[#2997ff]"></i> Vehicle Details
              </h3>
              <input required id='captain-signup-vehicle-model' value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)}
                className='input-premium-dark' type="text" placeholder='Vehicle model (e.g. Swift Dzire)' />
              <div className='flex gap-3'>
                <input required id='captain-signup-vehicle-color' value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)}
                  className='input-premium-dark' type="text" placeholder='Color' />
                <input required id='captain-signup-vehicle-plate' value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)}
                  className='input-premium-dark uppercase' type="text" placeholder='Plate' />
              </div>
              <div className='flex gap-3'>
                <select required id='captain-signup-vehicle-capacity' value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)}
                  className='input-premium-dark appearance-none'>
                  <option value="" disabled>Capacity</option>
                  {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <select required id='captain-signup-vehicle-type' value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
                  className='input-premium-dark appearance-none'>
                  <option value="" disabled>Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="bike">Bike</option>
                </select>
              </div>
            </div>
          </div>

          <div className='slide-in-bottom stagger-5 pt-1'>
            <button id='captain-signup-submit' type='submit' className='btn-hero w-full'>Create Captain Account</button>
          </div>
        </form>

        <p className='text-[13px] text-white/30 text-center mt-4 slide-in-bottom stagger-6'>
          Already a Captain?{' '}
          <Link to='/captain-login' className='text-[#2997ff] font-medium hover:underline'>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default CaptainSignUp
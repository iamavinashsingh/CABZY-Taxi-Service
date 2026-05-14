import myLogo from '../assets/Cabzy-FullLogo.png'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import ShaderBackground from '../components/ui/ShaderBackground'

const CaptainLogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen relative flex items-center justify-center p-6 overflow-hidden'>
      {/* Animated shader background */}
      <ShaderBackground variant="dark" speed={0.5} />

      {/* Glass dark card */}
      <div className='glass-dark rounded-[28px] w-full max-w-[420px] p-8 page-enter relative z-10'>
        {/* Logo */}
        <div className='flex justify-center mb-8 scale-in'>
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center border border-white/10'>
            <img src={myLogo} alt="Cabzy" className='w-10' />
          </div>
        </div>

        {/* Heading */}
        <div className='text-center mb-8 slide-in-bottom stagger-1'>
          <h1 className='text-[28px] font-semibold text-white tracking-tight'>Captain Sign In</h1>
          <p className='text-white/40 text-[15px] mt-1'>Welcome back. Let's get on the road.</p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => submitHandler(e)} className='space-y-4'>
          <div className='slide-in-bottom stagger-2'>
            <label className='text-[13px] font-medium text-white/40 uppercase tracking-wider mb-2 block'>Email</label>
            <input
              required id='captain-login-email'
              value={email} onChange={(e) => setEmail(e.target.value)}
              className='input-premium-dark' type="email" placeholder='you@example.com' autoComplete="email"
            />
          </div>

          <div className='slide-in-bottom stagger-3'>
            <label className='text-[13px] font-medium text-white/40 uppercase tracking-wider mb-2 block'>Password</label>
            <input
              required id='captain-login-password'
              value={password} onChange={(e) => setPassword(e.target.value)}
              className='input-premium-dark' type="password" placeholder='Enter your password' autoComplete="current-password"
            />
          </div>

          <div className='slide-in-bottom stagger-4 pt-3'>
            <button id='captain-login-submit' type='submit' className='btn-hero w-full'>
              Sign In
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className='flex items-center gap-4 my-6 slide-in-bottom stagger-5'>
          <div className='flex-1 h-px bg-white/[0.08]' />
          <span className='text-[12px] text-white/30 uppercase tracking-widest'>or</span>
          <div className='flex-1 h-px bg-white/[0.08]' />
        </div>

        <div className='slide-in-bottom stagger-5'>
          <Link to='/login' id='captain-login-user-link'
            className='block w-full text-center py-3.5 text-white/60 border border-white/10 rounded-[14px] hover:bg-white/[0.05] transition-all'>
            Sign in as User
          </Link>
        </div>

        <p className='text-[14px] text-white/30 text-center mt-6 slide-in-bottom stagger-6'>
          Want to drive with us?{' '}
          <Link to='/captain-signup' className='text-[#2997ff] font-medium hover:underline'>Become a Captain</Link>
        </p>
      </div>
    </div>
  )
}

export default CaptainLogIn
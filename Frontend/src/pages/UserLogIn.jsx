import React, { useState, useContext } from 'react'
import logo from '../assets/Cabzy-Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
import ShaderBackground from '../components/ui/ShaderBackground'

const UserLogIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen relative flex items-center justify-center p-6 overflow-hidden'>
      {/* Animated shader background */}
      <ShaderBackground variant="light" speed={0.5} />

      {/* Glass login card */}
      <div className='glass-card rounded-[28px] w-full max-w-[420px] p-8 page-enter relative z-10'>
        {/* Logo */}
        <div className='flex justify-center mb-8 scale-in'>
          <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066cc] to-[#2997ff] flex items-center justify-center shadow-lg shadow-blue-500/20'>
            <img src={logo} alt="Cabzy" className='w-10 brightness-0 invert' />
          </div>
        </div>

        {/* Heading */}
        <div className='text-center mb-8 slide-in-bottom stagger-1'>
          <h1 className='text-[28px] font-semibold text-[#1d1d1f] tracking-tight'>Welcome back</h1>
          <p className='text-[#86868b] text-[15px] mt-1'>Sign in to your Cabzy account</p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => submitHandler(e)} className='space-y-4'>
          <div className='slide-in-bottom stagger-2'>
            <label className='text-[13px] font-medium text-[#86868b] uppercase tracking-wider mb-2 block'>
              Email
            </label>
            <input
              required
              id='user-login-email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input-premium'
              type="email"
              autoComplete="email"
              placeholder='you@example.com'
            />
          </div>

          <div className='slide-in-bottom stagger-3'>
            <label className='text-[13px] font-medium text-[#86868b] uppercase tracking-wider mb-2 block'>
              Password
            </label>
            <input
              required
              id='user-login-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='input-premium'
              type="password"
              autoComplete="current-password"
              placeholder='Enter your password'
            />
          </div>

          <div className='slide-in-bottom stagger-4 pt-3'>
            <button
              id='user-login-submit'
              type='submit'
              className='btn-hero w-full'
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className='flex items-center gap-4 my-6 slide-in-bottom stagger-5'>
          <div className='flex-1 h-px bg-black/[0.06]' />
          <span className='text-[12px] text-[#86868b] uppercase tracking-widest'>or</span>
          <div className='flex-1 h-px bg-black/[0.06]' />
        </div>

        {/* Captain sign in */}
        <div className='slide-in-bottom stagger-5'>
          <Link
            to='/captain-login'
            id='user-login-captain-link'
            className='btn-ghost w-full text-center block'
          >
            Sign in as Captain
          </Link>
        </div>

        {/* Footer link */}
        <p className='text-[14px] text-[#86868b] text-center mt-6 slide-in-bottom stagger-6'>
          New here?{' '}
          <Link to='/signup' className='text-[#0066cc] font-medium hover:underline'>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default UserLogIn
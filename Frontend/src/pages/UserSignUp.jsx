import React, { useState, useContext } from 'react'
import logo from '../assets/Cabzy-Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import ShaderBackground from '../components/ui/ShaderBackground'

const UserSignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
  }

  return (
    <div className='min-h-screen relative flex items-center justify-center p-6 overflow-hidden'>
      {/* Animated shader background */}
      <ShaderBackground variant="light" speed={0.5} />

      {/* Glass signup card */}
      <div className='glass-card rounded-[28px] w-full max-w-[420px] p-8 page-enter relative z-10'>
        {/* Logo */}
        <div className='flex justify-center mb-6 scale-in'>
          <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066cc] to-[#2997ff] flex items-center justify-center shadow-lg shadow-blue-500/20'>
            <img src={logo} alt="Cabzy" className='w-9 brightness-0 invert' />
          </div>
        </div>

        {/* Heading */}
        <div className='text-center mb-6 slide-in-bottom stagger-1'>
          <h1 className='text-[26px] font-semibold text-[#1d1d1f] tracking-tight'>Create your account</h1>
          <p className='text-[#86868b] text-[15px] mt-1'>Start riding with Cabzy today</p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => submitHandler(e)} className='space-y-3.5'>
          <div className='flex gap-3 slide-in-bottom stagger-2'>
            <div className='flex-1'>
              <label className='text-[12px] font-medium text-[#86868b] uppercase tracking-wider mb-1.5 block'>First name</label>
              <input
                required id='user-signup-firstname'
                value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className='input-premium' type="text" placeholder='John' autoComplete="given-name"
              />
            </div>
            <div className='flex-1'>
              <label className='text-[12px] font-medium text-[#86868b] uppercase tracking-wider mb-1.5 block'>Last name</label>
              <input
                id='user-signup-lastname'
                value={lastName} onChange={(e) => setLastName(e.target.value)}
                className='input-premium' type="text" placeholder='Doe' autoComplete="family-name"
              />
            </div>
          </div>

          <div className='slide-in-bottom stagger-3'>
            <label className='text-[12px] font-medium text-[#86868b] uppercase tracking-wider mb-1.5 block'>Email</label>
            <input
              required id='user-signup-email'
              value={email} onChange={(e) => setEmail(e.target.value)}
              className='input-premium' type="email" placeholder='you@example.com' autoComplete="email"
            />
          </div>

          <div className='slide-in-bottom stagger-4'>
            <label className='text-[12px] font-medium text-[#86868b] uppercase tracking-wider mb-1.5 block'>Password</label>
            <input
              required id='user-signup-password'
              value={password} onChange={(e) => setPassword(e.target.value)}
              className='input-premium' type="password" placeholder='Min. 8 characters' autoComplete="new-password"
            />
          </div>

          <div className='slide-in-bottom stagger-5 pt-2'>
            <button id='user-signup-submit' type='submit' className='btn-hero w-full'>
              Create Account
            </button>
          </div>
        </form>

        <p className='text-[14px] text-[#86868b] text-center mt-5 slide-in-bottom stagger-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-[#0066cc] font-medium hover:underline'>Sign in</Link>
        </p>

        <p className='text-[11px] text-[#86868b]/60 text-center mt-4 leading-relaxed'>
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default UserSignUp

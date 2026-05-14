import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CaptainLogout = () => {
  const token = localStorage.getItem('captain-token')
  const navigate = useNavigate()

  axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    if (response.status === 200) { localStorage.removeItem('captain-token'); navigate('/captain-login') }
  })

  return (
    <div className='h-screen mesh-gradient-dark flex flex-col items-center justify-center gap-4'>
      <div className='loading-spinner !w-10 !h-10 !border-white/20 !border-t-[#2997ff]' />
      <p className='text-[14px] text-white/40'>Signing out...</p>
    </div>
  )
}

export default CaptainLogout
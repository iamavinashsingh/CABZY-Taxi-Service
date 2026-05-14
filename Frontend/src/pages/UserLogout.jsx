import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const UserLogout = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
    headers: { Authorization: `Bearer ${token}` }
  }).then((response) => {
    if (response.status === 200) { localStorage.removeItem('token'); navigate('/login') }
  })

  return (
    <div className='h-screen mesh-gradient flex flex-col items-center justify-center gap-4'>
      <div className='loading-spinner !w-10 !h-10' />
      <p className='text-[14px] text-[#86868b]'>Signing out...</p>
    </div>
  )
}

export default UserLogout
import React, { useState, useContext } from 'react'
import logo from '../assets/Cabzy-Logo.png'
import { Link , useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogIn = () => {
  // use state to store the user input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()


  const submitHandler = async (e) =>{
    // write the code to submit the form
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
    <div className='p-7 flex flex-col justify-between h-screen bg-gradient-to-br from-[#4B4B55] via-[#373843] to-[#4B4B55]'>
      <div>
        <img src={logo}  alt="Logo of Cabzy" className='w-28 mb-10' />
        <form onSubmit={(e)=>{          
          submitHandler(e)
        }} >
          <h3 className='text-base text-[#F7F7F9] font-bold mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange = {(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#F7F7F9] rounded-md px-4 py-2 mb-7 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            type="email" 
            placeholder='example@email.com'
          />

          <h3 className='text-base text-[#F7F7F9] font-bold  mb-2'>Enter Password</h3>        
          <input 
            required
            value={password}
            onChange = {(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[hsl(240,14%,97%)] rounded-md px-4 py-2 mb-7 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            type="password"
            placeholder='password'/>

          <button className='bg-[#242430] rounded-md px-4 py-2 mb-2 w-full text-lg text-[#F7F7F9] font-bold active:scale-[99%] transition-transform duration-100'>Login</button>         
        </form>
        <p className='text-[#F7F7F9] text-center'>New here? <Link to='/signup' className='text-[#EFBE1D] font-light'>Create new Account</Link></p>
      </div>
      <div>
        <Link to='/captain-login' className='flex justify-center items-center mb-5 bg-[#A44720] w-full text-[#F7F7F9] py-3 rounded-md mt-4'>Sign In as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogIn
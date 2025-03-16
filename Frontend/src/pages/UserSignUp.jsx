import React, { useState, useContext } from 'react'
import logo from '../assets/Cabzy-Logo.png'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'


const UserSignUp
 = () => {
  // use state to store the user input
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async(e)=> {
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
      navigate('/home')}
    }

  return (
    <div className='p-7 flex flex-col justify-between h-screen bg-gradient-to-br from-[#4B4B55] via-[#373843] to-[#4B4B55]'>
      <div>
        <img src={logo}  alt="Logo of Cabzy" className='w-28 mb-10' />
        <form onSubmit={(e)=>{          
          submitHandler(e)
        }} >
          <h3 className='text-base text-[#F7F7F9] font-medium mb-2'>What's your name</h3>
          <div className='flex space-x-2 mb-7'>
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
          </div>
          <h3 className='text-base text-[#F7F7F9] font-medium mb-2'>What's your email</h3>
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

          <h3 className='text-base text-[#F7F7F9] font-medium  mb-2'>Enter Password</h3>        
          <input 
            required
            value={password}
            onChange = {(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[hsl(240,14%,97%)] rounded-md px-4 py-2 mb-7 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            type="password"
            placeholder='password'/>

          <button className='bg-[#242430] rounded-md px-4 py-2 mb-2 w-full text-base text-[#F7F7F9] font-medium active:scale-[99%] transition-transform duration-100'>Create account</button> 
                  
        </form>
        <p className='text-[#F7F7F9] text-center'>Already have account ? <Link to='/login' className='text-[#EFBE1D] font-light'>Login here</Link></p>
        
      </div>
      <div>
        <p className='text-[10px] text-[#F7F7F9] leading-tight'>This site is protected by reCAPTCHA, and the <span className='underline font-semibold'>Google Privacy Policy</span> and <span className='underline font-semibold'>Terms of Service*</span> apply.</p>
      </div>
      
    </div>
  )
}

export default UserSignUp

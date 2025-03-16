import myLogo from '../assets/Cabzy-FullLogo.png'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogIn = () => {
  // use state to store the user input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()


  const submitHandler = async(e) =>{
    // write the code to submit the form
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
    <div className='p-7 flex flex-col justify-between h-screen '>
      <div>
        <img src={myLogo}  alt="Logo of Cabzy" className='w-20 mb-5' />
        <form onSubmit={(e)=>{          
          submitHandler(e)
        }} >
          <h3 className='text-base text-[#242430] font-bold mb-2'>What's your email</h3>
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

          <h3 className='text-base text-[#242430] font-bold  mb-2'>Enter Password</h3>        
          <input 
            required
            value={password}
            onChange = {(e) => {
              setPassword(e.target.value)
            }}
            className='bg-[hsl(240,14%,97%)] rounded-md px-4 py-2 mb-7 border w-full text-base outline-none focus:ring-2 focus:ring-[#EFBE1D] placeholder:text-base'
            type="password"
            placeholder='password'/>

          <button className='bg-[#242430] rounded-md px-4 py-2 mb-2 w-full text-base text-[#F7F7F9] font-bold active:scale-[99%] transition-transform duration-100 '>Login</button>         
        </form>
        <p className='text-[#242430] text-center'>Turn Miles into Money! <Link to='/captain-signup' className='text-[#EFBE1D] font-light'>Become a Captain</Link></p>
      </div>
      <div>
        <Link to='/login' className='flex justify-center items-center mb-5 bg-[#1C8147] w-full text-[#F7F7F9] py-3 rounded-md mt-4'>Sign In as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogIn
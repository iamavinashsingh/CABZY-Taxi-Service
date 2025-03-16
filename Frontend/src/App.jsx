import React from 'react'
import Start from './pages/Start'
import Home from './pages/Home'
import CaptainHome from './pages/CaptainHome'
import {Routes , Route} from 'react-router-dom'
import UserLogIn from './pages/UserLogIn'
import UserSignUp from './pages/UserSignUp'
import CaptainLogIn from './pages/CaptainLogIn'
import CaptainSignUp from './pages/CaptainSignUp'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/riding" element={ <UserProtectWrapper> <Riding /> </UserProtectWrapper> } />
        <Route path="/home" element={ <UserProtectWrapper> <Home /> </UserProtectWrapper> } />
        <Route path='/users/logout' element={ <UserProtectWrapper> <UserLogout /> </UserProtectWrapper> } />
        <Route path="/captain-home" element={ <CaptainProtectWrapper> <CaptainHome /> </CaptainProtectWrapper> } />
        <Route path="/captains/logout" element={ <CaptainProtectWrapper> <CaptainLogout /> </CaptainProtectWrapper> } />
        <Route path="/captain-riding" element={ <CaptainProtectWrapper> <CaptainRiding /> </CaptainProtectWrapper> } />       
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogIn />} /> 
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogIn />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />     
      </Routes>
    </div> 
  )
}

export default App
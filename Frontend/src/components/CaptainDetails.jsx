import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import pfp from '../assets/atulPFP.jpg'
import ToggleSwitch from "../components/ToggleSwitch";

const CaptainDetails = ({ handleUpdateLocationClick, isTrackingEnabled }) => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div className='h-full px-5 py-5 flex flex-col'>
      {/* Profile row */}
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <img className='h-14 w-14 rounded-2xl object-cover' src={pfp} alt="Captain" />
            <div className='absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-[#0a0a0a]' />
          </div>
          <div>
            <h2 className='text-[17px] font-semibold text-white'>
              {captain.fullname.firstname + " " + captain.fullname.lastname}
            </h2>
            <p className='text-[13px] text-white/40'>
              {captain.vehicle.plate} · Swift Dzire
            </p>
          </div>
        </div>
        <ToggleSwitch onToggle={handleUpdateLocationClick} isOn={isTrackingEnabled} />
      </div>

      <div className='divider-dark' />

      {/* Stats grid */}
      <div className='flex-1 grid grid-cols-2 gap-3 mt-4'>
        <div className='stat-card'>
          <div className='flex items-center gap-2 mb-2'>
            <div className='w-8 h-8 rounded-xl bg-[#2997ff]/15 flex items-center justify-center'>
              <i className="text-[14px] text-[#2997ff] ri-time-line"></i>
            </div>
          </div>
          <h3 className='text-[22px] font-bold text-white'>45.6</h3>
          <p className='text-[11px] text-white/30 uppercase tracking-wider mt-0.5'>Hours online</p>
        </div>
        <div className='stat-card'>
          <div className='flex items-center gap-2 mb-2'>
            <div className='w-8 h-8 rounded-xl bg-[#2997ff]/15 flex items-center justify-center'>
              <i className="text-[14px] text-[#2997ff] ri-steering-2-line"></i>
            </div>
          </div>
          <h3 className='text-[22px] font-bold text-white'>326.1</h3>
          <p className='text-[11px] text-white/30 uppercase tracking-wider mt-0.5'>Kms driven</p>
        </div>
        <div className='stat-card'>
          <div className='flex items-center gap-2 mb-2'>
            <div className='w-8 h-8 rounded-xl bg-[#2997ff]/15 flex items-center justify-center'>
              <i className="text-[14px] text-[#2997ff] ri-money-rupee-circle-line"></i>
            </div>
          </div>
          <h3 className='text-[22px] font-bold text-white'>₹2,803</h3>
          <p className='text-[11px] text-white/30 uppercase tracking-wider mt-0.5'>Total earned</p>
        </div>
        <div className='stat-card'>
          <div className='flex items-center gap-2 mb-2'>
            <div className='w-8 h-8 rounded-xl bg-[#2997ff]/15 flex items-center justify-center'>
              <i className="text-[14px] text-[#2997ff] ri-star-half-s-line"></i>
            </div>
          </div>
          <h3 className='text-[22px] font-bold text-white'>4.3</h3>
          <p className='text-[11px] text-white/30 uppercase tracking-wider mt-0.5'>Rating</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
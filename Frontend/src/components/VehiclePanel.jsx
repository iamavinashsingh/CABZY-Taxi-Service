import React, { useState } from 'react'
import bikeIcon from '../assets/bikeIcon.png'
import cabIcon from '../assets/cabIcon.png'
import autoIcon from '../assets/autoIcon.png'

const VehiclePanel = (props) => {
  const [selected, setSelected] = useState(null)

  const vehicles = [
    { key: 'car', icon: cabIcon, name: 'Cabzy Go', desc: '4 seats · Comfortable sedan', time: '3 min' },
    { key: 'bike', icon: bikeIcon, name: 'Cabzy Bike', desc: '1 seat · Fastest option', time: '2 min' },
    { key: 'auto', icon: autoIcon, name: 'Cabzy Auto', desc: '3 seats · Budget friendly', time: '1 min' },
  ]

  return (
    <div>
      <div className='sheet-handle' />
      <h5 onClick={() => props.setVehiclePanel(false)}
        className='absolute top-3 right-5 text-[#86868b] cursor-pointer hover:text-[#1d1d1f] transition-colors'>
        <i className="text-2xl ri-close-line"></i>
      </h5>
      <h3 className='text-[22px] font-semibold text-[#1d1d1f] mb-1'>Choose a ride</h3>
      <p className='text-[14px] text-[#86868b] mb-5'>Select the vehicle that suits your trip</p>

      <div className='space-y-3'>
        {vehicles.map(v => (
          <div key={v.key}
            onClick={() => { setSelected(v.key); props.setConfirmRidePanel(true); props.setVehicle(v.key); }}
            className={`ride-card flex items-center gap-4 ${selected === v.key ? 'selected' : ''}`}>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] flex items-center justify-center flex-shrink-0'>
              <img className='h-10' src={v.icon} alt={v.name} />
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <h4 className='text-[16px] font-semibold text-[#1d1d1f]'>{v.name}</h4>
                <span className='text-[11px] text-[#0066cc] bg-[#0066cc]/8 px-2 py-0.5 rounded-full font-medium'>{v.time}</span>
              </div>
              <p className='text-[13px] text-[#86868b] mt-0.5'>{v.desc}</p>
            </div>
            <span className='text-[18px] font-bold text-[#1d1d1f]'>₹{props.fare?.[v.key] || '—'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VehiclePanel
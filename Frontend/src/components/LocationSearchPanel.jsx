import React from 'react';

const LocationSearchPanel = ({ suggestions, setPanelOpen, setPickup, setDestination, activeField }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') setPickup(suggestion.title)
    else if (activeField === 'destination') setDestination(suggestion.title)
  }

  return (
    <div className='overflow-y-auto max-h-[50vh] no-scrollbar py-2'>
      {suggestions.map((elem, idx) => (
        <div key={idx} onClick={() => handleSuggestionClick(elem)}
          className='flex items-center gap-3 px-4 py-3 mx-2 hover:bg-white/[0.04] transition-all duration-200 cursor-pointer rounded-2xl group'>
          <div className='w-10 h-10 rounded-xl bg-[#2997ff]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2997ff]/25 transition-colors'>
            <i className="ri-map-pin-line text-[#2997ff] text-[15px]"></i>
          </div>
          <div className='flex-1 min-w-0'>
            <h4 className='text-white/80 text-[15px] truncate group-hover:text-white transition-colors'>{elem.title}</h4>
          </div>
          <i className="ri-arrow-right-s-line text-white/20 group-hover:text-white/40 transition-colors"></i>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
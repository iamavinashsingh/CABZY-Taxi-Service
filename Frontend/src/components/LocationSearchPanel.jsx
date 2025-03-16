import React from 'react';

const LocationSearchPanel = ({ suggestions, setPanelOpen, setPickup, setDestination, activeField }) => {
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.title)
        } else if (activeField === 'destination') {
            setDestination(suggestion.title)
        }
    }

    return (
        <div className='overflow-y-auto max-h-[50vh]'>
            {suggestions.map((elem, idx) => (
                <div key={idx} onClick={() => handleSuggestionClick(elem)}
                    className='flex items-center gap-3 p-3 hover:bg-gray-100/10 transition-colors cursor-pointer'>
                    <div className='bg-[#1C8147] p-2 rounded-full'>
                        <i className="ri-map-pin-line text-white text-lg"></i>
                    </div>
                    <div className='flex-1'>
                        <h4 className='text-white font-medium'>{elem.title}</h4>
                    </div>
                </div>
            ))
            
            }
        </div>  
    );
};

export default LocationSearchPanel;
import React, { useState } from "react";

const ToggleSwitch = ({ onToggle }) => {
const [isOn, setIsOn] = useState(false);

const handleClick = () => {
    const newState = !isOn;
    setIsOn(newState);
    
    if (newState) {
      onToggle(); // Call function only when turning ON
    }
};

return (
    <div 
        className={`w-14 h-8 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
        isOn ? "bg-green-500" : "bg-red-500"
        }`}
        onClick={handleClick}
    ><div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                isOn ? "translate-x-7" : "translate-x-1"
            }`}
        ></div>
    </div>
  );
};

export default ToggleSwitch;

import React, { useState } from "react";

const ToggleSwitch = ({ onToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    const newState = !isOn;
    setIsOn(newState);
    if (newState) onToggle();
  };

  return (
    <div
      className={`w-[52px] h-[30px] flex items-center rounded-full cursor-pointer transition-all duration-300 ${
        isOn
          ? "bg-gradient-to-r from-[#0066cc] to-[#2997ff] shadow-lg shadow-blue-500/20"
          : "bg-white/15"
      }`}
      onClick={handleClick}
    >
      <div
        className={`w-[24px] h-[24px] bg-white rounded-full shadow-md transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOn ? "translate-x-[24px]" : "translate-x-[3px]"
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;

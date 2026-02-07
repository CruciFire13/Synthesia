import React from "react";
import { FaVolumeUp, FaVolumeMute, FaListUl } from "react-icons/fa";

const Features = ({ volume, onVolumeChange }) => {
  return (
    <div className="flex items-center gap-4 text-gray-400">
      <FaListUl className="hover:text-white cursor-pointer" />

      <div className="flex items-center gap-2 w-32 group">
        {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(e.target.value)}
          className="w-full h-1 bg-gray-600 rounded-lg appearance-none accent-purple-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Features;

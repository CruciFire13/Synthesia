import React from "react";
import { ImVolumeMedium, ImVolumeMute2 } from "react-icons/im"; // Ensure react-icons is installed

const Features = ({ volume, onVolumeChange }) => {
  return (
    <div className="features-root flex items-center gap-2 w-[20%] justify-end pr-4">
      <button onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}>
        {volume === 0 ? (
          <ImVolumeMute2 size={20} color="#a855f7" />
        ) : (
          <ImVolumeMedium size={20} color="#a855f7" />
        )}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="volume-slider w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
        style={{
          backgroundSize: `${volume * 100}% 100%`,
        }}
      />
    </div>
  );
};

export default Features;

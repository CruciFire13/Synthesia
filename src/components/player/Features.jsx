import React, { useState, useRef, useEffect } from "react";
import { BsVolumeUp, BsVolumeMute, BsShuffle, BsRepeat } from "react-icons/bs";

const Features = ({
  volume,
  onVolumeChange,
  isShuffle,
  onToggleShuffle,
  isLoop,
  onToggleLoop,
  playbackRate,
  onSpeedChange,
}) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSpeedMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const speeds = [0.5, 1, 1.5, 2];

  return (
    <div className="flex items-center gap-4">
      {/* Volume */}
      <div className="flex items-center gap-2 group">
        <button
          onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}
          className="text-gray-400 hover:text-white"
        >
          {volume === 0 ? <BsVolumeMute size={20} /> : <BsVolumeUp size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      <div className="h-6 w-[1px] bg-white/10 mx-1"></div>

      {/* Shuffle */}
      <button
        onClick={onToggleShuffle}
        className={`transition-colors ${isShuffle ? "text-purple-500" : "text-gray-400 hover:text-white"}`}
        title="Shuffle"
      >
        <BsShuffle size={18} />
      </button>

      {/* Loop */}
      <button
        onClick={onToggleLoop}
        className={`transition-colors ${isLoop ? "text-purple-500" : "text-gray-400 hover:text-white"}`}
        title="Loop"
      >
        <BsRepeat size={20} />
      </button>

      {/* Speed Dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowSpeedMenu(!showSpeedMenu)}
          className="w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-400 border border-gray-600 rounded hover:text-white hover:border-white transition-all"
        >
          {playbackRate}x
        </button>

        {/* The Dropdown Box */}
        {showSpeedMenu && (
          <div className="absolute bottom-full mb-2 right-0 bg-[#282828] border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[80px] animate-fade-in">
            {speeds.map((rate) => (
              <button
                key={rate}
                onClick={() => {
                  onSpeedChange(rate);
                  setShowSpeedMenu(false);
                }}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-white/10 transition-colors ${playbackRate === rate ? "text-purple-500 font-bold" : "text-gray-300"}`}
              >
                {rate}x
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;

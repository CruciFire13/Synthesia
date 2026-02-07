import React from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedo,
} from "react-icons/fa";

const ControlArea = ({
  isPlaying,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
}) => {
  const formatTime = (time) => {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl gap-2">
      {/* Buttons */}
      <div className="flex items-center gap-6 text-gray-400">
        <FaRandom className="hover:text-white cursor-pointer transition text-sm" />
        <FaStepBackward className="hover:text-white cursor-pointer transition text-lg" />

        {/* Play/Pause Circle */}
        <button
          onClick={onTogglePlay}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition shadow-lg shadow-purple-500/20"
        >
          {isPlaying ? (
            <FaPause size={14} />
          ) : (
            <FaPlay size={14} className="ml-1" />
          )}
        </button>

        <FaStepForward className="hover:text-white cursor-pointer transition text-lg" />
        <FaRedo className="hover:text-white cursor-pointer transition text-sm" />
      </div>

      {/* Progress Bar Row */}
      <div className="flex items-center gap-3 w-full text-xs font-medium text-gray-400">
        <span className="w-10 text-right">{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => onSeek(e.target.value)}
          className="flex-1 h-1 rounded-lg appearance-none bg-gray-600 accent-purple-500 cursor-pointer hover:accent-purple-400"
        />

        <span className="w-10">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ControlArea;

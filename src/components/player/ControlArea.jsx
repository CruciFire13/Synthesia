import React from "react";
import { GiPauseButton } from "react-icons/gi";
import { FaCirclePlay } from "react-icons/fa6";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";

const ControlArea = ({
  isPlaying,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
}) => {
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[600px] gap-2">
      {/* Buttons Row */}
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-white transition">
          <TbPlayerTrackPrevFilled size={20} />
        </button>

        <button
          className="hover:scale-105 transition active:scale-95"
          onClick={onTogglePlay}
        >
          {isPlaying ? (
            <GiPauseButton size={38} className="text-purple-500" />
          ) : (
            <FaCirclePlay size={38} className="text-purple-500" />
          )}
        </button>

        <button className="text-gray-400 hover:text-white transition">
          <TbPlayerTrackNextFilled size={20} />
        </button>
        <button className="text-gray-400 hover:text-purple-500 transition ml-4">
          <FaRegHeart size={18} />
        </button>
      </div>

      {/* Progress Bar Row */}
      <div className="flex items-center gap-3 w-full text-xs text-gray-400 font-medium">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer hover:h-1.5 transition-all accent-purple-500"
          style={{
            backgroundSize: `${(currentTime / duration) * 100}% 100%`,
          }}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ControlArea;

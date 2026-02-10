import React from "react";
import {
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

const ControlArea = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  currentTime,
  duration,
  onSeekStart,
  onSeekChange,
  onSeekEnd,
  isFavourite,
  toggleFavourite,
}) => {
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg gap-2">
      {/* Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={onPrev}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FaStepBackward size={20} />
        </button>

        <button
          onClick={onTogglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <FaPause size={16} />
          ) : (
            <FaPlay size={16} className="ml-1" />
          )}
        </button>

        <button
          onClick={onNext}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <FaStepForward size={20} />
        </button>

        <button
          onClick={() => currentSong && toggleFavourite(currentSong)}
          className={`transition-colors ${currentSong && isFavourite(currentSong._id) ? "text-purple-500" : "text-gray-400 hover:text-white"}`}
        >
          {currentSong && isFavourite(currentSong._id) ? (
            <FaHeart size={18} />
          ) : (
            <FaRegHeart size={18} />
          )}
        </button>
      </div>

      {/* Progress Bar (FIXED) */}
      <div className="w-full flex items-center gap-3 text-xs text-gray-400 font-medium">
        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          // 1. Mouse Down: Stop UI updates from audio
          onMouseDown={onSeekStart}
          onTouchStart={onSeekStart}
          // 2. Change (Drag): Update visual slider only
          onChange={(e) => onSeekChange(Number(e.target.value))}
          // 3. Mouse Up: Commit value to Audio Player
          onMouseUp={(e) => onSeekEnd(Number(e.target.value))}
          onTouchEnd={(e) => onSeekEnd(Number(e.target.value))}
          className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
          style={{ height: "4px" }}
        />

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ControlArea;

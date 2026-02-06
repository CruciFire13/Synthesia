import React from "react";

const SongDetail = ({ currentSong }) => {
  // Safe Fallback
  if (!currentSong) {
    return (
      <div className="flex items-center gap-4 animate-pulse">
        <div className="w-14 h-14 bg-gray-800 rounded-md"></div>
        <div className="flex flex-col gap-2">
          <div className="w-24 h-3 bg-gray-800 rounded"></div>
          <div className="w-16 h-3 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <img
        src={currentSong.imgUrl}
        alt={currentSong.name}
        className="w-14 h-14 object-cover rounded-md shadow-lg border border-white/10"
      />
      <div className="flex flex-col justify-center">
        <h4 className="text-white font-medium text-sm hover:underline cursor-pointer truncate max-w-[150px]">
          {currentSong.name}
        </h4>
        <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition">
          {currentSong.artist}
        </p>
      </div>
    </div>
  );
};

export default SongDetail;

import React from "react";
import { FaHeart } from "react-icons/fa";

const SongDetail = ({ currentSong }) => {
  if (!currentSong) return null;

  return (
    <div className="flex items-center gap-4 animate-fade-in">
      {/* Song Image */}
      <div className="relative group">
        <img
          src={currentSong.imgUrl || "https://via.placeholder.com/50"}
          alt="Album Art"
          className="w-14 h-14 rounded-md object-cover shadow-lg"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center overflow-hidden">
        <h3 className="text-white font-semibold text-sm truncate hover:underline cursor-pointer">
          {currentSong.name}
        </h3>
        <p className="text-gray-400 text-xs hover:text-white cursor-pointer transition">
          {currentSong.artist}
        </p>
      </div>

      {/* Like Icon */}
      <button className="ml-2 text-gray-400 hover:text-purple-500 transition">
        <FaHeart />
      </button>
    </div>
  );
};

export default SongDetail;

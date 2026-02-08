import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerProvider";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SongDetail = ({ currentSong }) => {
  const { toggleFavourite, isFavourite } = useContext(PlayerContext);

  if (!currentSong) return null;
  const liked = isFavourite(currentSong._id);

  return (
    <div className="flex items-center gap-4 animate-fade-in">
      <div className="relative group">
        <img
          src={currentSong.imgUrl || "https://via.placeholder.com/50"}
          alt="Album Art"
          className="w-14 h-14 rounded-md object-cover shadow-lg"
        />
      </div>

      <div className="flex flex-col justify-center overflow-hidden w-40">
        <h3 className="text-white font-semibold text-sm truncate">
          {currentSong.name}
        </h3>
        <p className="text-gray-400 text-xs">{currentSong.artist}</p>
      </div>

      {/* Functional Heart Button */}
      <button
        onClick={() => toggleFavourite(currentSong)}
        className={`ml-2 text-lg transition-transform active:scale-90 ${liked ? "text-purple-500" : "text-gray-400 hover:text-white"}`}
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default SongDetail;

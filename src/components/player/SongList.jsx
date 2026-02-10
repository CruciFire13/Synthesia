import React, { useContext } from "react";
import { FaPlay, FaPause, FaHeart, FaRegHeart } from "react-icons/fa";
import { PlayerContext } from "../../context/PlayerProvider";

// Ensure this path matches your file structure exactly
import "../../css/mainArea/SongList.css";

const SongList = ({ songs, onSongClick }) => {
  const context = useContext(PlayerContext);

  // Safety check to prevent crashing if context is still loading
  if (!context) return null;

  const { currentSong, isPlaying, isFavourite, toggleFavourite } = context;

  return (
    <div className="w-full text-gray-300">
      {/* Table Header */}
      <div className="grid grid-cols-[50px_1fr_1fr_1fr_50px] gap-4 p-4 text-xs font-semibold text-gray-400 border-b border-white/10 uppercase">
        <div className="text-center">#</div>
        <div>Title</div>
        <div className="hidden md:block">Artist</div>
        <div className="hidden sm:block text-right pr-8">Duration</div>
        <div className="text-center">
          <FaHeart />
        </div>
      </div>

      {/* Song Rows */}
      <div className="flex flex-col">
        {songs.map((song, index) => {
          const isActive = currentSong && currentSong._id === song._id;

          // Determine the correct image URL (iTunes uses imgUrl, manual lists often use img)
          const albumArt =
            song.imgUrl ||
            song.img ||
            "https://placehold.co/40x40/222/fff?text=Music";

          return (
            <div
              key={song._id}
              className={`group grid grid-cols-[50px_1fr_1fr_1fr_50px] gap-4 p-3 items-center hover:bg-white/10 rounded-lg cursor-pointer transition-colors ${isActive ? "bg-white/10" : ""}`}
              onClick={() => onSongClick(song)}
            >
              {/* 1. Index / Play Button */}
              <div className="text-center text-sm relative flex justify-center items-center">
                <span
                  className={`group-hover:hidden ${isActive ? "text-purple-500" : ""}`}
                >
                  {isActive && isPlaying ? (
                    <img
                      src="https://i.gifer.com/YdBO.gif"
                      width="15"
                      alt="playing"
                    />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="hidden group-hover:block text-white">
                  {isActive && isPlaying ? (
                    <FaPause size={12} />
                  ) : (
                    <FaPlay size={12} />
                  )}
                </span>
              </div>

              {/* 2. Thumbnail & Title (Updated) */}
              <div className="flex items-center gap-4">
                <img
                  src={albumArt}
                  alt={song.name}
                  className="w-10 h-10 rounded object-cover shadow-lg border border-white/10"
                />
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-medium truncate ${isActive ? "text-purple-500" : "text-white"}`}
                  >
                    {song.name}
                  </span>
                  <span className="text-xs text-gray-400 md:hidden">
                    {song.artist}
                  </span>
                </div>
              </div>

              {/* 3. Artist */}
              <div className="hidden md:block text-sm truncate hover:text-white">
                {song.artist}
              </div>

              {/* 4. Duration (Formatted) */}
              <div className="hidden sm:block text-sm text-right pr-8">
                {/* Convert seconds to mm:ss if it's a raw number */}
                {song.duration.includes(":")
                  ? song.duration
                  : `${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, "0")}`}
              </div>

              {/* 5. Like Button */}
              <div
                className="text-center"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(song);
                }}
              >
                {isFavourite(song._id) ? (
                  <FaHeart className="text-purple-500 hover:scale-110 transition-transform mx-auto" />
                ) : (
                  <FaRegHeart className="hover:text-white hover:scale-110 transition-transform mx-auto" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongList;

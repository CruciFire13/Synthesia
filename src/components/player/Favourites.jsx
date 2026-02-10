import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerProvider";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";

const Favourites = () => {
  const { favourites, currentSong, isPlaying, playSong, toggleFavourite } =
    useContext(PlayerContext);

  if (favourites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 animate-fade-in">
        <FaHeart size={64} className="mb-4 text-gray-600 opacity-50" />
        <h2 className="text-2xl font-bold mb-2">No Favourites Yet</h2>
        <p>Start liking songs to see them here!</p>
      </div>
    );
  }

  return (
    <div className="w-full text-white pb-32 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 px-4">Liked Songs</h2>

      {/* Grid Layout for Favourites */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {favourites.map((song) => {
          const isActive = currentSong && currentSong._id === song._id;

          return (
            <div
              key={song._id}
              className="group relative bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all hover:-translate-y-1 flex items-center gap-4 cursor-pointer border border-white/5 hover:border-white/10"
              onClick={() => playSong(song)} // Make playable
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <img
                  src={song.img}
                  alt={song.name}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
                {/* Overlay Play Icon */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  {isActive && isPlaying ? <FaPause /> : <FaPlay />}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold truncate ${isActive ? "text-purple-500" : "text-white"}`}
                >
                  {song.name}
                </h3>
                <p className="text-sm text-gray-400 truncate">{song.artist}</p>
              </div>

              {/* Unlike Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavourite(song);
                }}
                className="p-2 text-purple-500 hover:text-white transition-colors"
                title="Remove from Favourites"
              >
                <FaHeart size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favourites;

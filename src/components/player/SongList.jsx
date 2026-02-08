import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerProvider";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SongList = ({ songs, onSongClick }) => {
  const { currentSong, toggleFavourite, isFavourite } =
    useContext(PlayerContext);

  if (!songs || songs.length === 0) return null;

  const formatDuration = (duration) => {
    if (!duration) return "0:00";
    if (typeof duration === "string" && duration.includes(":")) return duration;
    let sec = parseInt(duration);
    if (sec > 10000) sec = sec / 1000;
    const min = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${min}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[#a7a7a7] text-xs uppercase border-b border-white/10">
            <th className="py-3 w-12 text-center">#</th>
            <th className="py-3 w-12"></th> {/* Heart Column */}
            <th className="py-3">Name</th>
            <th className="py-3">Artist</th>
            <th className="py-3">Year</th>
            <th className="py-3 text-right pr-6">Duration</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => {
            const isActive = currentSong && currentSong._id === song._id;
            const liked = isFavourite(song._id);

            return (
              <tr
                key={song._id}
                className={`group cursor-pointer transition-colors border-b border-white/5 h-12 text-sm
                  ${isActive ? "bg-purple-900/40 border-l-4 border-l-purple-500" : "hover:bg-white/5"}
                `}
              >
                {/* Number */}
                <td
                  className={`text-center w-12 ${isActive ? "text-purple-400" : "text-gray-400"}`}
                  onClick={() => onSongClick(song)}
                >
                  {isActive ? "▶" : index + 1}
                </td>

                {/* Heart Button */}
                <td className="w-12 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent playing song when clicking heart
                      toggleFavourite(song);
                    }}
                    className={`transition-transform hover:scale-110 ${liked ? "text-purple-500" : "text-gray-500 hover:text-white"}`}
                  >
                    {liked ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </td>

                {/* Info */}
                <td
                  className="font-medium text-white"
                  onClick={() => onSongClick(song)}
                >
                  <span className={isActive ? "text-purple-300" : "text-white"}>
                    {song.name}
                  </span>
                </td>
                <td className="text-gray-400" onClick={() => onSongClick(song)}>
                  {song.artist}
                </td>
                <td className="text-gray-400" onClick={() => onSongClick(song)}>
                  {song.year}
                </td>
                <td
                  className="text-gray-400 text-right pr-6"
                  onClick={() => onSongClick(song)}
                >
                  {formatDuration(song.duration)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;

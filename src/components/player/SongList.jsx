import React from "react";
import "../../css/mainArea/SongList.css";

const SongList = ({ songs, onSongClick }) => {
  if (!songs || songs.length === 0) return null;

  // Helper to convert "210" (seconds) -> "3:30"
  const formatDuration = (duration) => {
    if (!duration) return "0:00";
    // If it's already a string like "3:30", just return it
    if (typeof duration === "string" && duration.includes(":")) return duration;

    // Otherwise, convert number to Min:Sec
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="songlist-root w-full">
      <table className="songlist-table w-full text-left">
        <thead>
          <tr className="text-gray-400 border-b border-white/10 text-xs uppercase">
            <th className="py-3 pl-4">#</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Year</th>
            <th className="pr-4">
              <div className="flex justify-end">Time</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={song._id || index} // Safe key fallback
              onClick={() => onSongClick(song)}
              className="hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 h-12 group"
            >
              <td className="pl-4 text-gray-400 w-10">{index + 1}</td>
              <td className="text-white font-medium">
                <div className="flex items-center gap-3">
                  {/* Show tiny image in list if available */}
                  <img
                    src={song.imgUrl}
                    className="w-8 h-8 rounded object-cover"
                    alt=""
                  />
                  <span className="truncate max-w-[200px]">
                    {song.name
                      // Clean up HTML entities sometimes returned by API
                      .replace("&quot;", '"')
                      .replace("&amp;", "&")}
                  </span>
                </div>
              </td>
              <td className="text-gray-400 text-sm truncate max-w-[150px]">
                {song.artist}
              </td>
              <td className="text-gray-400 text-sm">{song.year || "-"}</td>
              <td className="text-gray-400 text-sm pr-4 text-right">
                {formatDuration(song.duration)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;

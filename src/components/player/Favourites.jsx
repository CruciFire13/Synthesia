import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerProvider";
import SongList from "./SongList";
import { FaHeartBroken } from "react-icons/fa";

const Favourites = () => {
  const { favourites, playSong } = useContext(PlayerContext);

  return (
    <div className="w-full px-6 py-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
        My Favourites{" "}
        <span className="text-purple-500 text-lg ml-2">
          ({favourites.length})
        </span>
      </h2>

      {favourites.length > 0 ? (
        <SongList songs={favourites} onSongClick={playSong} />
      ) : (
        // Empty State Design
        <div className="flex flex-col items-center justify-center h-64 text-gray-500 mt-10">
          <FaHeartBroken size={60} className="mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-400">
            No Favourites Yet
          </h3>
          <p className="text-sm mt-2">
            Go search for songs and click the ❤️ icon!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;

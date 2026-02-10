import React from "react";

const SongDetail = ({ currentSong }) => {
  if (!currentSong)
    return (
      <div className="flex items-center gap-4 opacity-50">
        <div className="w-14 h-14 bg-white/10 rounded-md animate-pulse"></div>
        <div className="flex flex-col gap-2 w-24">
          <div className="h-3 bg-white/10 rounded animate-pulse"></div>
          <div className="h-3 w-2/3 bg-white/10 rounded animate-pulse"></div>
        </div>
      </div>
    );

  // FIX: Check for 'imgUrl' (iTunes API) OR 'img' (Manual List)
  const albumArt =
    currentSong.imgUrl ||
    currentSong.img ||
    "https://placehold.co/60x60/222/fff?text=Music";

  return (
    <div className="flex items-center gap-4">
      {/* Album Art Container */}
      <div className="relative w-14 h-14 group flex-shrink-0">
        <img
          src={albumArt}
          alt={currentSong.name}
          className="w-full h-full object-cover rounded-md shadow-lg group-hover:opacity-80 transition-opacity border border-white/5"
          // Fallback if image fails to load
          onError={(e) => {
            e.target.src = "https://placehold.co/60x60/222/fff?text=Error";
          }}
        />
      </div>

      {/* Text Info */}
      <div className="flex flex-col justify-center overflow-hidden">
        <h4 className="text-white font-semibold text-sm truncate max-w-[150px]">
          {currentSong.name}
        </h4>
        <p className="text-gray-400 text-xs truncate max-w-[150px]">
          {currentSong.artist}
        </p>
      </div>
    </div>
  );
};

export default SongDetail;

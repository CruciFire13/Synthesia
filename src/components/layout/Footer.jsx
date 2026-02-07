import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerProvider";

import SongDetail from "../player/SongDetail";
import ControlArea from "../player/ControlArea";
import Features from "../player/Features";

const Footer = () => {
  const context = useContext(PlayerContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Sync with Audio Element
  useEffect(() => {
    if (!context || !context.audioRef.current) return;
    const audio = context.audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [context]);

  if (!context) return null;
  const { currentSong, isPlaying, playSong, pauseSong, audioRef } = context;

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolume = (val) => {
    if (audioRef.current) {
      audioRef.current.volume = val;
      setVolume(val);
    }
  };

  return (
    <footer className="w-full h-24 bg-[#121212] border-t border-white/10 px-4 flex justify-between items-center fixed bottom-0 left-0 z-50 backdrop-blur-lg bg-opacity-95">
      {/* 1. Left: Song Info (30% width) */}
      <div className="w-[30%]">
        <SongDetail currentSong={currentSong} />
      </div>

      {/* 2. Center: Controls & Progress (40% width) */}
      <div className="w-[40%] flex justify-center">
        <ControlArea
          isPlaying={isPlaying}
          onTogglePlay={isPlaying ? pauseSong : () => playSong(currentSong)}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
      </div>

      {/* 3. Right: Volume & Extras (30% width) */}
      <div className="w-[30%] flex justify-end">
        <Features volume={volume} onVolumeChange={handleVolume} />
      </div>
    </footer>
  );
};

export default Footer;

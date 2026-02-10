import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerProvider";
import SongDetail from "../player/SongDetail";
import ControlArea from "../player/ControlArea";
import Features from "../player/Features";

const Footer = () => {
  const context = useContext(PlayerContext);
  if (!context) return null;

  const {
    currentSong,
    isPlaying,
    playSong,
    pauseSong,
    nextSong,
    prevSong,
    audioRef,
    isFavourite,
    toggleFavourite,
    isShuffle,
    toggleShuffle,
    isLoop,
    toggleLoop,
    playbackRate,
    changeSpeed,
  } = context;

  // Local State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      // Only update if user IS NOT dragging
      if (!isDragging) setCurrentTime(audio.currentTime);
    };
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [isDragging, audioRef]);

  // Seeker Handlers
  const onSeekStart = () => setIsDragging(true);
  const onSeekChange = (val) => setCurrentTime(val);
  const onSeekEnd = (val) => {
    if (audioRef.current) audioRef.current.currentTime = val;
    setIsDragging(false);
  };

  const handleVolume = (val) => {
    if (audioRef.current) audioRef.current.volume = val;
    setVolume(val);
  };

  return (
    <footer className="w-full h-24 bg-[#121212] border-t border-white/10 px-4 flex justify-between items-center fixed bottom-0 left-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="w-[30%] min-w-[200px]">
        <SongDetail currentSong={currentSong} />
      </div>

      <div className="w-[40%] flex justify-center">
        <ControlArea
          currentSong={currentSong}
          isPlaying={isPlaying}
          onTogglePlay={isPlaying ? pauseSong : () => playSong(currentSong)}
          onNext={nextSong}
          onPrev={prevSong}
          currentTime={currentTime}
          duration={duration}
          onSeekStart={onSeekStart}
          onSeekChange={onSeekChange}
          onSeekEnd={onSeekEnd}
          isFavourite={isFavourite}
          toggleFavourite={toggleFavourite}
        />
      </div>

      <div className="w-[30%] flex justify-end min-w-[200px]">
        <Features
          volume={volume}
          onVolumeChange={handleVolume}
          isShuffle={isShuffle}
          onToggleShuffle={toggleShuffle}
          isLoop={isLoop}
          onToggleLoop={toggleLoop}
          playbackRate={playbackRate}
          onSpeedChange={changeSpeed}
        />
      </div>
    </footer>
  );
};

export default Footer;

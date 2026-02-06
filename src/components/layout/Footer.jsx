import React, { useContext, useEffect, useState } from "react";
// Import from the consolidated PlayerProvider file
import { PlayerContext } from "../../context/PlayerProvider";

import SongDetail from "../player/SongDetail";
import ControlArea from "../player/ControlArea";
import Features from "../player/Features";

import "../../css/footer/Footer.css";

const Footer = () => {
  const context = useContext(PlayerContext);

  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);


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
    <footer className="footer-root footer-glow">
      <SongDetail currentSong={currentSong} />

      <ControlArea
        isPlaying={isPlaying}
        onTogglePlay={isPlaying ? pauseSong : () => playSong(currentSong)}
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />

      <Features volume={volume} onVolumeChange={handleVolume} />
    </footer>
  );
};

export default Footer;

import React, { createContext, useState, useRef, useEffect } from "react";

// 1. CREATE the Context here (since the other file is missing)
export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize Audio
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
    }
  }, []);

  const playSong = async (song) => {
    const audio = audioRef.current;
    if (!audio || !song?.audioUrl) return;

    try {
      if (currentSong?._id !== song._id) {
        audio.src = song.audioUrl;
        audio.load();
        setCurrentSong(song);
      }
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Playback error:", err);
      setIsPlaying(false);
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <PlayerContext.Provider
      value={{ currentSong, isPlaying, playSong, pauseSong, audioRef }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

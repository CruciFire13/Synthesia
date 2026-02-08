import React, { createContext, useState, useRef, useEffect } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favourites, setFavourites] = useState([]); // Store Favourites
  const audioRef = useRef(new Audio());

  // 1. Load Favourites from LocalStorage on Startup
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("synthesia_favs")) || [];
    setFavourites(savedFavs);
  }, []);

  // 2. Play Song Function
  const playSong = (song) => {
    if (currentSong && currentSong._id === song._id) {
      if (isPlaying) {
        pauseSong();
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (currentSong) {
        audioRef.current.pause();
      }
      setCurrentSong(song);
      audioRef.current.src = song.audioUrl;
      audioRef.current.play().catch((e) => console.error("Play error:", e));
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // 3. Toggle Favourite Function
  const toggleFavourite = (song) => {
    let newFavs;
    const exists = favourites.find((fav) => fav._id === song._id);

    if (exists) {
      // Remove if already liked
      newFavs = favourites.filter((fav) => fav._id !== song._id);
    } else {
      // Add if not liked
      newFavs = [...favourites, song];
    }

    setFavourites(newFavs);
    localStorage.setItem("synthesia_favs", JSON.stringify(newFavs));
  };

  // Check if a song is liked
  const isFavourite = (songId) => {
    return favourites.some((fav) => fav._id === songId);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        audioRef,
        favourites,
        toggleFavourite,
        isFavourite,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

import React, { createContext, useState, useRef, useEffect } from "react";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const audioRef = useRef(new Audio());
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 1;

  // --- INITIALIZE AUDIO SETTINGS ---
  useEffect(() => {
    // Setting crossOrigin helps avoid CORS issues with certain audio sources
    audioRef.current.crossOrigin = "anonymous";
  }, []);

  // --- FETCH SONGS FROM BACKEND ---
  useEffect(() => {
    const fetchInitialSongs = async () => {
      try {
        setLoading(true);
        console.log("📡 Fetching songs from http://localhost:5000/api/songs");

        const response = await axios.get("http://localhost:5000/api/songs");

        console.log("✅ Received songs:", response.data.length);
        setSongs(response.data);

        if (response.data.length === 0) {
          setErrorMessage("No songs available");
        }
      } catch (error) {
        console.error("❌ Failed to fetch songs:", error);
        setErrorMessage(`Failed to load songs: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialSongs();
  }, []);

  // --- AUDIO EVENT LISTENERS ---
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      console.log("🎵 Song ended");
      if (isLoop) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      } else {
        nextSong();
      }
    };

    const handleError = (e) => {
      const error = e.target.error;
      console.error("🔴 Audio Error:", {
        code: error?.code,
        message: error?.message,
        src: audio.src,
      });

      setIsPlaying(false);

      if (retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current += 1;
        console.log(`♻️ Retrying... (${retryCountRef.current}/${MAX_RETRIES})`);
        setTimeout(() => {
          audio.load();
          audio.play().catch(() => nextSong());
        }, 1000);
      } else {
        retryCountRef.current = 0;
        setErrorMessage("Unable to play this song. Skipping...");
        setTimeout(() => nextSong(), 1500); // Auto skip after error
      }
    };

    const handleCanPlay = () => {
      // console.log("✅ Audio ready");
      setErrorMessage(null);
      retryCountRef.current = 0;
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [currentSong, isLoop, songs]); // Added 'songs' dependency for nextSong access

  // --- PLAY SONG ---
  const playSong = async (songOrId) => {
    let targetSong = songOrId;
    if (typeof songOrId === "string") {
      targetSong = songs.find((s) => s._id === songOrId);
    }

    if (!targetSong || !targetSong.audioUrl) {
      console.error("❌ Invalid song or missing audioUrl");
      return;
    }

    // Handle Play/Pause for the same song
    if (currentSong && currentSong._id === targetSong._id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.error("Resume failed:", err);
            setErrorMessage("Playback blocked. Try clicking again.");
          });
      }
      return;
    }

    // Play New Song
    try {
      console.log("🔄 Loading:", targetSong.name);

      // Reset state before loading new song
      setIsPlaying(false);
      setErrorMessage(null);
      retryCountRef.current = 0;

      audioRef.current.src = targetSong.audioUrl;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.load(); // Explicit load call

      setCurrentSong(targetSong);

      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log("✅ Playing:", targetSong.name);
          })
          .catch((error) => {
            console.error("❌ Play promise rejected:", error);
            if (error.name === "NotAllowedError") {
              setErrorMessage("Click Play to start music");
            } else {
              setErrorMessage("Loading...");
            }
            setIsPlaying(false);
          });
      }
    } catch (error) {
      console.error("❌ Play setup failed:", error);
      setIsPlaying(false);
    }
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextSong = () => {
    if (songs.length === 0) return;

    if (!currentSong) {
      playSong(songs[0]);
      return;
    }

    const currentIndex = songs.findIndex((s) => s._id === currentSong._id);
    let nextIndex;

    if (isShuffle) {
      // Avoid picking the exact same song if possible
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentIndex && songs.length > 1);
    } else {
      nextIndex = (currentIndex + 1) % songs.length;
    }

    // Check if next song exists
    if (songs[nextIndex]) {
      playSong(songs[nextIndex]);
    }
  };

  const prevSong = () => {
    if (!currentSong || songs.length === 0) return;
    const currentIndex = songs.findIndex((s) => s._id === currentSong._id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) setIsLoop(false);
  };

  const toggleLoop = () => {
    setIsLoop(!isLoop);
    if (!isLoop) setIsShuffle(false);
  };

  const changeSpeed = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) audioRef.current.playbackRate = rate;
  };

  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem("synthesia_favs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavourite = (song) => {
    const newFavs = favourites.some((f) => f._id === song._id)
      ? favourites.filter((f) => f._id !== song._id)
      : [...favourites, song];

    setFavourites(newFavs);
    try {
      localStorage.setItem("synthesia_favs", JSON.stringify(newFavs));
    } catch (error) {
      console.error("Failed to save favourites:", error);
    }
  };

  const isFavourite = (id) => favourites.some((f) => f._id === id);

  return (
    <PlayerContext.Provider
      value={{
        songs,
        setSongs,
        currentSong,
        isPlaying,
        playSong,
        pauseSong,
        nextSong,
        prevSong,
        audioRef,
        favourites,
        toggleFavourite,
        isFavourite,
        isShuffle,
        toggleShuffle,
        isLoop,
        toggleLoop,
        playbackRate,
        changeSpeed,
        errorMessage,
        setErrorMessage,
        loading,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

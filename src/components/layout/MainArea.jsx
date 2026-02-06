import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PlayerContext } from "../../context/PlayerProvider";

import Auth from "../auth/Auth";
import Playlist from "../player/Playlist";
import SearchBar from "../search/SearchBar";
import SongList from "../player/SongList";
import SongGrid from "../songs/SongGrid";

import "../../css/mainArea/MainArea.css";

const MainArea = ({ view }) => {
  const context = useContext(PlayerContext);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!context) {
    throw new Error("MainArea must be used within a PlayerProvider");
  }
  const { playSong } = context;

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/songs");
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div className="mainarea-root flex flex-col h-full bg-[#121212] rounded-lg overflow-hidden ml-2 mr-2">
      {/* 1. TOP HEADER (Auth + Playlist Header ONLY) */}
      <div className="mainarea-top p-6 bg-gradient-to-b from-white/10 to-[#121212]">
        <Auth />
        {/* Only show Playlist header on Home */}
        {view === "home" && <Playlist />}
      </div>

      {/* 2. SCROLLABLE CONTENT AREA */}
      <div className="mainarea-scroll flex-1 overflow-y-auto custom-scrollbar">
        {/* VIEW 1: HOME (Show Global Song List) */}
        {view === "home" &&
          (loading ? (
            <div className="p-10 text-white">Loading...</div>
          ) : (
            <SongList songs={songs} onSongClick={playSong} />
          ))}

        {/* VIEW 2: SEARCH (Show ONLY SearchBar) */}
        {view === "search" && (
          // SearchBar is self-contained (Input + Results), so it takes the whole space
          <SearchBar />
        )}

        {/* VIEW 3: FAVOURITES (Show Grid) */}
        {view === "favourite" && (
          <SongGrid songs={songs} onSongClick={playSong} />
        )}
      </div>
    </div>
  );
};

export default MainArea;

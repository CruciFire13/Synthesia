import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { PlayerContext } from "../../context/PlayerProvider";

import Playlist from "../player/Playlist";
import SearchBar from "../search/SearchBar";
import SongList from "../player/SongList";
import Favourites from "../player/Favourites";

import "../../css/mainArea/MainArea.css";

const MainArea = ({ view, user, onLogout }) => {
  const context = useContext(PlayerContext);
  const [songs, setSongs] = useState([]); // Stores ALL songs
  const [filteredSongs, setFilteredSongs] = useState([]); // Stores CURRENTLY visible songs
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState("All"); // Track active mood

  if (!context) {
    throw new Error("MainArea must be used within a PlayerProvider");
  }
  const { playSong } = context;

  // 1. Fetch Songs on Load
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/songs");
        setSongs(response.data);
        setFilteredSongs(response.data); // Default: Show all songs
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  // 2. Handle Mood Selection
  const handlePlaylistSelect = (category) => {
    setSelectedMood(category);

    if (category === "All") {
      setFilteredSongs(songs);
    } else {
      // Filter logic: Check if song genre/mood matches the category
      // If your backend data doesn't have 'genre', we just mock a filter for now
      const filtered = songs.filter(
        (song) =>
          song.genre?.toLowerCase() === category.toLowerCase() ||
          song.category?.toLowerCase() === category.toLowerCase() ||
          // Fallback: search in title if no genre exists
          song.title.toLowerCase().includes(category.toLowerCase()),
      );

      // If filter returns empty (e.g. backend missing data), show all for demo
      setFilteredSongs(filtered.length > 0 ? filtered : songs);
    }
  };

  return (
    <div className="mainarea-root flex flex-col h-full bg-[#121212] rounded-lg overflow-hidden">
      {/* HEADER AREA */}
      <div className="mainarea-top p-6 bg-gradient-to-b from-white/10 to-[#121212]">
        {/* Auth & Title Bar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold">
            {view === "home"
              ? selectedMood === "All"
                ? "Good Morning"
                : `${selectedMood} Songs`
              : "Search"}
          </h2>

          <div className="flex gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm font-medium">
                  Hi, {user.name}
                </span>
                <button
                  onClick={onLogout}
                  className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <SignUpButton mode="modal">
                  <button className="text-gray-300 hover:text-white font-semibold">
                    Signup
                  </button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <button className="px-6 py-2 rounded-full bg-white text-black font-bold hover:scale-105">
                    Login
                  </button>
                </SignInButton>
              </>
            )}
          </div>
        </div>

        {/* Playlist Cards (Only on Home) */}
        {view === "home" && (
          <Playlist onSelectCategory={handlePlaylistSelect} />
        )}
      </div>

      {/* SCROLLABLE SONG LIST */}
      <div className="mainarea-scroll flex-1 overflow-y-auto custom-scrollbar">
        {view === "home" &&
          (loading ? (
            <div className="p-10 text-white">Loading Songs...</div>
          ) : (
            // 3. Pass the FILTERED list here
            <div className="pb-32">
              {" "}
              {/* Padding for player */}
              {filteredSongs.length > 0 ? (
                <SongList songs={filteredSongs} onSongClick={playSong} />
              ) : (
                <div className="text-gray-400 p-4">
                  No songs found for {selectedMood}.
                </div>
              )}
            </div>
          ))}

        {view === "search" && <SearchBar />}
        {view === "favourite" && <Favourites />}
      </div>
    </div>
  );
};

export default MainArea;

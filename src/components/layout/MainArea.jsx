import React, { useContext, useEffect, useState } from "react";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import { PlayerContext } from "../../context/PlayerProvider";

import Playlist from "../player/Playlist";
import SearchBar from "../search/SearchBar";
import SongList from "../player/SongList";
import Favourites from "../player/Favourites";

import "../../css/mainArea/MainArea.css";

const MainArea = ({ view, user, onLogout }) => {
  const { playSong, songs, loading } = useContext(PlayerContext);

  const [displaySongs, setDisplaySongs] = useState([]);
  const [selectedMood, setSelectedMood] = useState("All");

  // 1. Sync State on Load
  useEffect(() => {
    if (songs) setDisplaySongs(songs);
  }, [songs]);

  // 2. Filter Logic (Matches Server Mood Tags)
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    if (mood === "All") {
      setDisplaySongs(songs);
    } else {
      // Filter the songs where the mood matches the clicked button
      const filtered = songs.filter((s) => s.mood === mood);
      setDisplaySongs(filtered);
    }
  };

  return (
    <div className="mainarea-root flex flex-col h-full bg-[#121212] rounded-lg overflow-hidden ml-2 mr-2">
      <div className="mainarea-top p-6 bg-gradient-to-b from-white/10 to-[#121212]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-bold">
            {view === "home"
              ? selectedMood === "All"
                ? "All Songs"
                : `${selectedMood} Mix`
              : view.charAt(0).toUpperCase() + view.slice(1)}
          </h2>
          <div className="flex gap-4">
            {user ? (
              <button
                onClick={onLogout}
                className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm"
              >
                Logout
              </button>
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
        {/* Pass the handler to Playlist */}
        {view === "home" && (
          <Playlist
            onSelectMood={handleMoodSelect}
            selectedMood={selectedMood}
          />
        )}
      </div>

      <div className="mainarea-scroll flex-1 overflow-y-auto custom-scrollbar pb-32">
        {view === "home" &&
          (loading ? (
            <div className="text-white p-10">Loading Songs...</div>
          ) : (
            <SongList
              songs={displaySongs}
              onSongClick={(song) => playSong(song)}
            />
          ))}
        {view === "search" && <SearchBar />}
        {view === "favourite" && <Favourites />}
      </div>
    </div>
  );
};

export default MainArea;

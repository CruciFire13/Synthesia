import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
// Import PlayerContext to play the song
import { PlayerContext } from "../../context/PlayerProvider";
// Reuse your existing SongList to display results!
import SongList from "../player/SongList";

import "../../css/search/SearchBar.css"; // Ensure you have some basic CSS or use Tailwind

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchedSongs, setSearchedSongs] = useState([]);
  const { playSong } = useContext(PlayerContext);

  // Search whenever user types (Debounced or direct)
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.trim() === "") {
        setSearchedSongs([]);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/songs/search?query=${query}`,
        );
        setSearchedSongs(res.data);
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    // Small delay to prevent too many requests while typing
    const timeoutId = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="search-container w-full h-full flex flex-col p-6">
      {/* Search Input Field */}
      <div className="search-header mb-6">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            autoFocus
          />
        </div>
      </div>

      {/* Results Section */}
      <div className="search-results flex-1 overflow-y-auto">
        <h2 className="text-white text-xl font-bold mb-4">
          {query ? "Search Results" : "Start typing to search..."}
        </h2>

        {searchedSongs.length > 0 ? (
          <SongList songs={searchedSongs} onSongClick={playSong} />
        ) : (
          query && (
            <p className="text-gray-400">No songs found matching "{query}"</p>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;

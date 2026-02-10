import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { PlayerContext } from "../../context/PlayerProvider";
import SongList from "../player/SongList";

import "../../css/search/SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { playSong } = useContext(PlayerContext);

  // Search with debounce
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.trim() === "") {
        setSearchedSongs([]);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log("🔍 Searching for:", query);

        const res = await axios.get(`http://localhost:5000/api/songs/search`, {
          params: { query: query },
          timeout: 10000, // 10 second timeout
        });

        console.log("✅ Search results:", res.data.length, "songs");
        setSearchedSongs(res.data);

        if (res.data.length === 0) {
          setError(`No songs found for "${query}"`);
        }
      } catch (err) {
        console.error("❌ Search error:", err);

        if (err.code === "ECONNABORTED") {
          setError("Search timeout. Please try again.");
        } else if (err.response) {
          setError(`Search failed: ${err.response.status}`);
        } else if (err.request) {
          setError("Network error. Check if server is running.");
        } else {
          setError("Search failed. Please try again.");
        }

        setSearchedSongs([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: wait 500ms after user stops typing
    const timeoutId = setTimeout(() => {
      fetchSearchResults();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleClearSearch = () => {
    setQuery("");
    setSearchedSongs([]);
    setError(null);
  };

  return (
    <div className="search-container w-full h-full flex flex-col p-6">
      {/* Search Input Field */}
      <div className="search-header mb-6">
        <div className="relative w-full max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400 z-10" />
          <input
            type="text"
            placeholder="Search for songs, artists, albums..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-12 rounded-full bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            autoFocus
          />
          {query && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-3 text-gray-400 hover:text-white text-xl font-bold"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center justify-center mt-4 text-purple-400">
            <FaSpinner className="animate-spin mr-2" />
            <span>Searching...</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="search-results flex-1 overflow-y-auto custom-scrollbar">
        {/* Empty State */}
        {!query && !loading && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <FaSearch className="text-6xl text-gray-600 mb-4" />
            <h2 className="text-white text-2xl font-bold mb-2">
              Search for Music
            </h2>
            <p className="text-gray-400 max-w-md">
              Find your favorite songs, artists, and albums. Start typing to
              search across millions of tracks.
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-red-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">{error}</h3>
            <p className="text-gray-400 mb-4">
              Try searching for something else
            </p>
            <button
              onClick={handleClearSearch}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-full text-white font-semibold transition"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Results */}
        {query && searchedSongs.length > 0 && !loading && (
          <div>
            <h2 className="text-white text-xl font-bold mb-4">
              Search Results for "{query}"
              <span className="text-gray-400 text-sm ml-2 font-normal">
                ({searchedSongs.length} song
                {searchedSongs.length !== 1 ? "s" : ""})
              </span>
            </h2>
            <SongList songs={searchedSongs} onSongClick={playSong} />
          </div>
        )}

        {/* No Results State */}
        {query && searchedSongs.length === 0 && !loading && !error && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-gray-500 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              No results found
            </h3>
            <p className="text-gray-400 mb-4">
              We couldn't find any songs matching "{query}"
            </p>
            <div className="text-gray-500 text-sm">
              <p>Try:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Checking your spelling</li>
                <li>Using different keywords</li>
                <li>
                  Searching for popular artists like "Drake" or "Taylor Swift"
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

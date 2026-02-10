import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// Helper function to fetch specific moods
const fetchFromItunes = async (term, moodTag) => {
  try {
    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: {
        term: term,
        media: "music",
        limit: 5, // Fetch 5 songs per mood
        country: "US",
      },
    });

    if (response.data.results) {
      return response.data.results
        .filter((s) => s.previewUrl)
        .map((s) => ({
          _id: s.trackId.toString(),
          name: s.trackName,
          artist: s.artistName,
          imgUrl: s.artworkUrl100.replace("100x100bb", "600x600bb"),
          audioUrl: s.previewUrl,
          duration: Math.floor(s.trackTimeMillis / 1000).toString(),
          year: s.releaseDate ? s.releaseDate.split("-")[0] : "2024",
          // !!! CRITICAL: We manually tag the mood here !!!
          mood: moodTag,
        }));
    }
    return [];
  } catch (err) {
    console.error(`Error fetching ${moodTag}:`, err.message);
    return [];
  }
};

// ---------------------------------------------------------
// HOME PAGE - AGGREGATED MOODS
// ---------------------------------------------------------
app.get("/api/songs", async (req, res) => {
  try {
    console.log("🔍 Fetching songs for all moods...");

    // 1. Run all fetches in parallel for speed
    const [workout, chill, happy, relaxing, rock] = await Promise.all([
      fetchFromItunes("workout motivation", "Workout"),
      fetchFromItunes("lofi hip hop", "Chill"),
      fetchFromItunes("happy hits", "Happy"),
      fetchFromItunes("ambient piano", "Relaxing"),
      fetchFromItunes("classic rock", "Rock"),
    ]);

    // 2. Combine all lists
    let allSongs = [...workout, ...chill, ...happy, ...relaxing, ...rock];

    // 3. Shuffle the "All" list so it's not grouped by category
    allSongs = allSongs.sort(() => Math.random() - 0.5);

    console.log(`✅ Serving ${allSongs.length} mixed songs`);
    res.json(allSongs);
  } catch (error) {
    console.error("❌ Error generating homepage:", error.message);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

// Search API (Kept same)
app.get("/api/songs/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: { term: query, media: "music", limit: 20, country: "US" },
    });

    const songs = response.data.results
      .filter((s) => s.previewUrl)
      .map((s) => ({
        _id: s.trackId.toString(),
        name: s.trackName,
        artist: s.artistName,
        imgUrl: s.artworkUrl100.replace("100x100bb", "600x600bb"),
        audioUrl: s.previewUrl,
        duration: Math.floor(s.trackTimeMillis / 1000).toString(),
        mood: "Search",
      }));

    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

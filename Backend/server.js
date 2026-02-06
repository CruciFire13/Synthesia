import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import Song from "./models/song.js";

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI =
  "mongodb+srv://ajha99324:Beetel%40220@aryan.58zbm.mongodb.net/synthesia?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB Error:", err));

app.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/songs/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    console.log(`Searching iTunes for: ${query}...`);

    const response = await axios.get(
      `https://itunes.apple.com/search?term=${query}&media=music&limit=15`,
    );

    if (response.data.results) {
      const formattedSongs = response.data.results.map((song) => ({
        _id: song.trackId.toString(),
        name: song.trackName,
        artist: song.artistName,

        imgUrl: song.artworkUrl100.replace("100x100bb", "600x600bb"),

        audioUrl: song.previewUrl,
        duration: song.trackTimeMillis / 1000,
        year: song.releaseDate ? song.releaseDate.split("-")[0] : "2024",
      }));

      res.json(formattedSongs);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.error("Search Error:", err.message);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

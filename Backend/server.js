import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// ROUTE 1: HOME PAGE (Expanded List with Thumbnails)
// ---------------------------------------------------------
app.get("/api/songs", async (req, res) => {
  const homeSongs = [
    // --- TRIFACE SONGS (Custom Placeholder Art) ---
    {
      _id: "1",
      name: "J'm'e FPM",
      artist: "TriFace",
      imgUrl:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop", // Abstract Purple Art
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "183",
      year: "2004",
    },
    {
      _id: "2",
      name: "Trio HxC",
      artist: "TriFace",
      imgUrl:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: "101",
      year: "2004",
    },
    {
      _id: "3",
      name: "Un Poil De Relifion",
      artist: "TriFace",
      imgUrl:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duration: "207",
      year: "2004",
    },
    {
      _id: "4",
      name: "Apologies",
      artist: "TriFace",
      imgUrl:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      duration: "145",
      year: "2004",
    },
    {
      _id: "5",
      name: "Je Vomis Comme Je Chante",
      artist: "TriFace",
      imgUrl:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      duration: "177",
      year: "2004",
    },
    // --- SKAUT SONGS (Different Art Style) ---
    {
      _id: "6",
      name: "Mind Asylum",
      artist: "Skaut",
      imgUrl:
        "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500&auto=format&fit=crop", // Cool Surfer/Vibe Art
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
      duration: "183",
      year: "2004",
    },
    {
      _id: "7",
      name: "You Don't Know",
      artist: "Skaut",
      imgUrl:
        "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500&auto=format&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
      duration: "322",
      year: "2004",
    },
    {
      _id: "8",
      name: "Overcome",
      artist: "Skaut",
      imgUrl:
        "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500&auto=format&fit=crop",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
      duration: "292",
      year: "2004",
    },
    // --- FAMOUS HITS (Real Cover Art) ---
    {
      _id: "9",
      name: "Believer",
      artist: "Imagine Dragons",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/5/5c/Imagine_Dragons_-_Believer.png",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
      duration: "204",
      year: "2017",
    },
    {
      _id: "10",
      name: "Shape of You",
      artist: "Ed Sheeran",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29.jpg",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
      duration: "233",
      year: "2017",
    },
    {
      _id: "11",
      name: "Blinding Lights",
      artist: "The Weeknd",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
      duration: "200",
      year: "2020",
    },
    {
      _id: "12",
      name: "Levitating",
      artist: "Dua Lipa",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/3/3c/Dua_Lipa_-_Levitating.png",
      audioUrl:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
      duration: "203",
      year: "2020",
    },
  ];
  res.json(homeSongs);
});

// ---------------------------------------------------------
// ROUTE 2: SEARCH (iTunes API - 100% Reliable)
// ---------------------------------------------------------
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
        imgUrl: song.artworkUrl100.replace("100x100bb", "600x600bb"), // High Res
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
    res.json([]);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

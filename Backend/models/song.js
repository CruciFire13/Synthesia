import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  imgUrl: { type: String, required: true },
  audioUrl: { type: String, required: true },
  duration: { type: String, required: true },
  year: { type: Number, default: 2024 },
});

export default mongoose.model("Song", SongSchema);

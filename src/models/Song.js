// src/models/Song.js
import mongoose from 'mongoose';
const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  duration: Number,
  audioFile: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Song', SongSchema);

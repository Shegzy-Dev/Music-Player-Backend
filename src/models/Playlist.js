// src/models/Playlist.js
import mongoose from 'mongoose';
const PlaylistSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
});
export default mongoose.model('Playlist', PlaylistSchema);

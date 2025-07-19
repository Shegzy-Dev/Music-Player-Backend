// src/models/Comment.js
import mongoose from 'mongoose';
const CommentSchema = new mongoose.Schema({
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Comment', CommentSchema);

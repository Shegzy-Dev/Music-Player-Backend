import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';
import Song from '../models/Song.js';
import Comment from '../models/Comment.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const songs = await Song.find().populate('likedBy', 'username');
  res.json(songs);
});

router.post('/', [auth, upload.single('audioFile')], async (req, res) => {
  const { title, artist, duration } = req.body;
  const song = new Song({
    title,
    artist,
    duration,
    audioFile: req.file ? req.file.path : null,
  });
  await song.save();
  res.json(song);
});

router.post('/:id/like', auth, async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song.likedBy.includes(req.user.id)) {
    song.likedBy.push(req.user.id);
    await song.save();
  }
  res.json({ msg: 'liked' });
});

router.post('/:id/unlike', auth, async (req, res) => {
  const song = await Song.findById(req.params.id);
  song.likedBy = song.likedBy.filter((u) => u.toString() !== req.user.id);
  await song.save();
  res.json({ msg: 'unliked' });
});

router.post('/:id/comment', auth, async (req, res) => {
  const { text } = req.body;
  const comment = new Comment({
    song: req.params.id,
    user: req.user.id,
    text,
  });
  await comment.save();
  res.json(comment);
});

export default router;

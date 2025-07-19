import express from 'express';
import auth from '../middleware/auth.js';
import Playlist from '../models/Playlist.js';
import Song from '../models/Song.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const playlists = await Playlist.find({ owner: req.user.id }).populate(
    'songs'
  );
  res.json(playlists);
});

router.post('/', auth, async (req, res) => {
  const playlist = new Playlist({ name: req.body.name, owner: req.user.id });
  await playlist.save();
  res.json(playlist);
});

router.post('/:id/add_song', auth, async (req, res) => {
  const playlist = await Playlist.findOne({
    _id: req.params.id,
    owner: req.user.id,
  });
  if (!playlist) return res.status(404).json({ msg: 'Playlist not found' });

  const song = await Song.findById(req.body.songId);
  if (!song) return res.status(404).json({ msg: 'Song not found' });

  if (!playlist.songs.includes(song._id)) {
    playlist.songs.push(song._id);
    await playlist.save();
  }
  res.json({ msg: 'song added' });
});

router.post('/:id/remove_song', auth, async (req, res) => {
  const playlist = await Playlist.findOne({
    _id: req.params.id,
    owner: req.user.id,
  });
  if (!playlist) return res.status(404).json({ msg: 'Playlist not found' });

  playlist.songs = playlist.songs.filter(
    (s) => s.toString() !== req.body.songId
  );
  await playlist.save();
  res.json({ msg: 'song removed' });
});

export default router;

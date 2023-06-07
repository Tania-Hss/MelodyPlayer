const express = require("express");

const {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  deletePlaylistById,
  updatePlaylistName,
  addSongToPlaylist,
  deleteSongFromPlaylist,
} = require("../models/playlist");

const router = express.Router();

router.get("/playlists", (req, res) => {
  return getAllPlaylists()
    .then((playlists) => res.json(playlists))
    .catch((err) => res.status(500).json(err));
});

router.get("/playlists/:id", (req, res) => {
  const id = Number(req.params.id);
  return getPlaylistById(id).then((playlist) => res.json(playlist));
});

router.post("/playlists", (req, res, next) => {
  const { name, user_id } = req.body;
  console.log("recieved body :", { name, user_id });
  return createPlaylist(name, user_id)
    .then((result) => {
      //   console.log(result);
      res.status(201).json({
        id: result.rows[0].id,
        name,
        user_id,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/playlists/:id", (req, res, next) => {
  const id = Number(req.params.id);
  return deletePlaylistById(id).then((playlist) => {
    if (playlist.rowCount === 0) {
      const costumError = new Error(" can not find playlist with id: " + id);
      costumError.status = 404;
      return next(costumError);
    } else {
      res.sendStatus(204);
    }
  });
});

router.put("/playlists/:id", (req, res, next) => {
  const playlistId = Number(req.params.id);
  const { name } = req.body;
  return updatePlaylistName(playlistId, name)
    .then((playlist) => {
      if (!playlist) {
        const customError = new Error("Playlist not found");
        customError.status = 404;
        return next(customError);
      }
      res.json(playlist);
    })
    .catch((error) => next(error));
});

router.post("/playlists/:id/songs", (req, res, next) => {
  const playlistId = Number(req.params.id);
  const { song } = req.body;
  return addSongToPlaylist(playlistId, song)
    .then((playlist) => {
      if (!playlist) {
        const customError = new Error("Playlist not found");
        customError.status = 404;
        return next(customError);
      }
      res.json(playlist);
    })
    .catch((error) => next(error));
});


router.delete("/playlists/:id/songs/:songUrl", (req, res, next) => {
    const playlistId = Number(req.params.id);
    const songUrl = req.params.songUrl
    
    console.log('deleting song with url :' ,songUrl)
    return deleteSongFromPlaylist(playlistId, songUrl)
      .then((playlist) => {
        if (!playlist) {
          const customError = new Error("Playlist not found");
          customError.status = 404;
          return next(customError);
        }
        res.json(playlist);
      })
      .catch((error) => next(error));
  });

module.exports = router;

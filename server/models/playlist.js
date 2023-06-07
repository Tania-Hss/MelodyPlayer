const db = require("./index");

const getAllPlaylists = () => {
  return db.query("select * from playlists;").then((result) => result.rows);
};

const getPlaylistById = (id) => {
  return db
    .query(`select * from playlists where id = ${id}`)
    .then((result) => result.rows);
};

const createPlaylist = async (name, user_id) => {
  const sql =
    "insert INTO playlists (name, user_id) VALUES ($1, $2) RETURNING *";
  return db.query(sql, [name, user_id]);
};

const deletePlaylistById = async (id) => {
  return db.query(`delete FROM playlists WHERE id = ${id}`);
};

const updatePlaylistName = async (id, name) => {
  const sql = "update playlists SET name = $1 WHERE id = $2 RETURNING *";
  return db.query(sql, [name, id]);
};

const addSongToPlaylist = async (playlistId, song) => {
    const sql = "update playlists set songs = array_append(songs, $1) WHERE id = $2 RETURNING *";
    return db.query(sql, [song, playlistId]);
};


const deleteSongFromPlaylist = async (playlistId, song) => {
    const sql = "update playlists set songs = array_remove(songs, $1) WHERE id = $2 RETURNING *";
    return db.query(sql, [song, playlistId]);
};

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  deletePlaylistById,
  updatePlaylistName,
  addSongToPlaylist,
  deleteSongFromPlaylist
};

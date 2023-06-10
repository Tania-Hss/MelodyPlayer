import { useState, useEffect } from "react";
import { useAuthentication } from "../contexts/AuthProvider";
import { NavLink } from "react-router-dom";
import DeletePlaylistButton from "./DeletePlaylist";
import EditPlaylistName from "./EditPlaylistName";
import './Playlist.css'

const Playlist = () => {
  const { user } = useAuthentication();
  //   console.log('user is',user);
  const { id } = user.user;
  const [playlists, setPlaylists] = useState([]);
  //   console.log("playlists is", playlists);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/playlists/user/${id}`
        );

        if (response.status === 200) {
          const data = await response.json();
          //   console.log(data);
          setPlaylists(data);
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchPlaylists();
    }
  }, [user]);

  const handleDeletePlaylist = (playlistId) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.id !== playlistId)
    );
  };

  return (
    <div className="playlist-container">
      <h1>My Playlists</h1>

      {playlists.map((playlist) => (
        <div key={playlist.id} className="playlists">
          <h3>{playlist.name}</h3>
          <p>Created on: {new Date(playlist.created_on).toLocaleString()}</p>
          {playlist.songs && playlist.songs.length > 0 ? (
              <ul>
              {playlist.songs.map((song, index) => (
                <li key={index}>
                  <a href={song}>{song}</a>
                </li>
              ))}
            </ul>
          ) : (
              <p>No songs available yet.</p>
              )}
              <DeletePlaylistButton
                playlistId={playlist.id}
                onDelete={handleDeletePlaylist}
              />
              <EditPlaylistName
                playlistId={playlist.id}
                currentName={playlist.name}
              />
        </div>
      ))}
    </div>
  );
};

export default Playlist;

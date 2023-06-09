import { useState, useEffect } from "react";
import { useAuthentication } from "../contexts/AuthProvider";

const Playlist = () => {
  const { user } = useAuthentication();
  //   console.log('user is',user);
  const { id } = user.user;
  const [playlists, setPlaylists] = useState([]);

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

  return (
    <div>
      <h1>My Playlists</h1>
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h3>{playlist.name}</h3>
          <p>Created on: {playlist.created_on}</p>
        </div>
      ))}
    </div>
  );
};

export default Playlist;

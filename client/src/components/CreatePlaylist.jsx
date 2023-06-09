import { useState } from "react";
import { useAuthentication } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
  const { user } = useAuthentication();
  const { id } = user.user;
  const [playlistName, setPlaylistName] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playlistName,
          user_id: id,
        }),
      });

      if (response.status === 201) {
        setPlaylistName("");
        navigate("/playlist");
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create Playlist</h2>
      <form onSubmit={handleSubmit}>
        <label>Playlist Name:</label>
        <input type="text" value={playlistName} onChange={handleNameChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;

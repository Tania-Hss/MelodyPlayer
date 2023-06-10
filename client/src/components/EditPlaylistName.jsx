import { useState } from "react";
import './Playlist.css'
const EditPlaylistName = ({ playlistId, currentName }) => {
  const [newName, setNewName] = useState(currentName);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleUpdatePlaylistName = async () => {
    try {
      const response = await fetch(`http://localhost:3000/playlists/${playlistId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.status === 200) {
        console.log("name updated yaay");
      
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <div>
      <button className="editbutton" onClick={handlePopup}>Modify Name</button>

      {showPopup && (
        <div>
          <input type="text" value={newName} onChange={handleInputChange} />
          <button className="editbutton" onClick={handleUpdatePlaylistName}>Update Name</button>
        </div>
      )}
    </div>
  );
};

export default EditPlaylistName;
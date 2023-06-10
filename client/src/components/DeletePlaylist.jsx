import './Playlist.css';

const DeletePlaylistButton = ({ playlistId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/playlists/${playlistId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 204) {
        onDelete(playlistId);
      } else {
        throw new Error("Can not delete playlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <button className='deletebutton' onClick={handleDelete}>Delete Playlist</button>;
};

export default DeletePlaylistButton;

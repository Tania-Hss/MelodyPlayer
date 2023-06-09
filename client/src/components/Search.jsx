import { useState } from "react";
import axios from "axios";
import "./Search.css";

const Search = ({ accessToken }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleClick = () => {
    axios
      .get(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=track&limit=15`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setSearchResults(response.data.tracks.items);
        console.log(searchResults);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="what do you want to listen to?"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleClick}>Search</button>
      
      <div className="search-results">
        {searchResults.map((track) => (
          <div className="track" key={track.id}>
            <p>{track.name}</p>
            <p>Artists: {track.artists.map((artist) => artist.name).join(', ')}</p>
            <img src={track.album.images[0].url} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;

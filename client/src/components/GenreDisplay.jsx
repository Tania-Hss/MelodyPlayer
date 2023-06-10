import { useEffect, useState } from "react";
import axios from "axios";
import './GenreDisplay.css'
const GenreDisplay = ({ accessToken }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accessToken]);

  return (
    <div className="genre-container">
      <h2>Available Genres:</h2>
      <div className="genre-blocks">
        {genres.slice(0,40).map((genre) => (
          <div key={genre} className="genre-block">
            {genre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreDisplay;

import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import axios from "axios";
import TrackSearch from "./components/SpotifyTrackSearch";
import LoginForm from "./pages/loginForm";
import SignupForm from "./pages/SignupForm";
import Playlist from "./components/Playlist";

import { useAuthentication } from "./contexts/AuthProvider";
function App() {
  const [accessToken, setAccessToken] = useState("");
  const { user, logout } = useAuthentication();
  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        setAccessToken(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <nav>
        {user ? (
          <>
            <NavLink className="link" to="/">
              Home
            </NavLink>
            <NavLink className="link" to="/playlist">
              Playlists
            </NavLink>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink className="link" to="/login">
              login
            </NavLink>
            <NavLink className="link" to="/signup">
              signup
            </NavLink>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<TrackSearch accessToken={accessToken} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </div>
  );
}

export default App;

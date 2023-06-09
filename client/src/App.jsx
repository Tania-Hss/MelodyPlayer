import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Search from "./components/search";
import LoginForm from "./pages/loginForm";
import SignupForm from "./pages/SignupForm";

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
        <Route path="/" element={<Search accessToken={accessToken} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;

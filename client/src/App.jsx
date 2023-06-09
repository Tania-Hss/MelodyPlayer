import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from 'react-router-dom';
import "./App.css";
import axios from "axios";
import Search from "./components/search";
import SignupFrom from "./pages/SignupForm";
import LoginForm from "./pages/loginForm";

function App() {
  const [accessToken, setAccessToken] = useState("");

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
        <NavLink className="link" to="/" >Home</NavLink>
        <NavLink className="link" to="/login" >login</NavLink>
        <NavLink className="link" to="/signup" >signup</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Search accessToken={accessToken} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupFrom />} />
      </Routes>
    </div>
  );
}

export default App;

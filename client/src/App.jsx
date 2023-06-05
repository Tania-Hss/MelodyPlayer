import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Search from "./components/search";

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
      <Search accessToken={accessToken} />
    </div>
  );
}

export default App;

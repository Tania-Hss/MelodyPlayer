import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Search from "./components/search";
import SignupFrom from "./pages/SignupForm";

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
      {/* <SignupFrom /> */}
    </div>
  );
}

export default App;

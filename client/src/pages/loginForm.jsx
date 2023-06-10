import { useAuthentication } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginForm.css";
const LoginForm = () => {
  const { login } = useAuthentication();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    try {
      await login(fields);
      navigate("/");
    } catch (error) {
      if (error) {
        setError(error.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" placeholder="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="Login" />
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;

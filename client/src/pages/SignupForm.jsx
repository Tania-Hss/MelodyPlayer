import { useAuthentication } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SignupForm.css";
const SignupFrom = () => {
  const { signup } = useAuthentication();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    try {
      await signup(fields);
      navigate("/login");
    } catch (error) {
      if (error) {
        setError(error.message);
      } else {
        setError("An error occurred. Please try again."); 
      }
    }
  };

  return (
    <div className="signup">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" placeholder="Username" />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" placeholder="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="Password" />
        <input type="submit" value="Signup" />
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default SignupFrom;

import { useAuthentication } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuthentication();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    try {
      await login(fields);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
      <input type="text" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <input type="submit" value="Login" />
    </form>
    </div>
    
  );
};

export default LoginForm;

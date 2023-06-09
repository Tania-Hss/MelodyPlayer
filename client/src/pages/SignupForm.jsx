import { useAuthentication } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const SignupFrom = () => {
    const { signup } = useAuthentication();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const fields = Object.fromEntries(new FormData(e.target));
      try {
        await signup(fields);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }

    return (
        <div>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <span>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" placeholder="Username" />
                </span>
                <span>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" placeholder="email" />
                </span>
                <span>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Password" />
                </span>
                <input type="submit" value="Signup" />
            </form>
        </div>
    )
}

export default SignupFrom
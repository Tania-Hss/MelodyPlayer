import { createContext, useContext, useState, useEffect } from "react";

const AuthenticationContext = createContext({});

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const baseUrl = "http://localhost:3000";

  useEffect(() => {
    const checkLoggedInUser = async () => {
        try {
          const response = await fetch(`${baseUrl}/session`);
          if (response.status === 200) {
            const { user } = await response.json(); 
            setUser(user); 
          }
        } catch (error) {
          console.log("Error checking login status:", error);
        }
      };

    checkLoggedInUser();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${baseUrl}/session`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser(null);
      window.location.replace("/login");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  const login = async (fields) => {
    try {
      const response = await fetch(`${baseUrl}/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (response.status !== 200) {
        const data = await response.json();
        throw {
          status: response.status,
          message: data.message,
        };
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.log("Error logging in:", error);
      throw error;
    }
  };

  const signup = async (fields) => {
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (response.status !== 201) {
        const data = await response.json();
        throw {
          status: response.status,
          message: data.message,
        };
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.log("Error signing up:", error);
      throw error;
    }
  };

  return (
    <AuthenticationContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};



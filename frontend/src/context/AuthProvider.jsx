import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        setLoading(false); // ✅ Must set loading to false here
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/users/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.user) {
          setUser(response.data.user);
          console.log("User verified:", response.data.user);
        } else {
          setUser(null);
          console.error("User verification failed");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Setup Axios Interceptors (only once)
  useEffect(() => {
    // Attach token to every request
    api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Auto logout if token is invalid/expired
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
          navigate("/"); // redirect to login
        }
        return Promise.reject(error);
      }
    );
  }, []);

  // ✅ Verify user when app starts
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.get("/users/verify");
        setUser(response.data.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  // ✅ Save user + token on login
  const login = (user, token) => {
    setUser(user);
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  // ✅ Clear user + token on logout
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

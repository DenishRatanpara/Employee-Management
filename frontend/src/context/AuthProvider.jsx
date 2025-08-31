import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 

  // ✅ Clear user + token on logout
  const logout = () => {
     const navigate = useNavigate();
    setUser(null);
    localStorage.removeItem("token");
    navigate("/"); // redirect to login
  };

  // ✅ Save user + token on login
  const login = (user, token) => {
    setUser(user);
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  // ✅ Setup Axios Interceptors (only once)
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    // ✅ Cleanup interceptors to prevent duplicates
    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, []);

  // ✅ Verify user when app starts
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.get("/users/verify");
        setUser(response.data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
 

  // ✅ Clear user + token on logout
  const logout = () => {
     const navigate = useNavigate();
    setUser(null);
    setEmployee(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Save user + token on login
  const login = (user, employee, token) => {
    setUser(user);
    setEmployee(employee);
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  // ✅ Verify user on app start
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user || null);
        setEmployee(res.data.employee );
      } catch {
        setUser(null);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, employee, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default AuthProvider;


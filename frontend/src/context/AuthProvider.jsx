// import React, { createContext, useContext, useEffect, useState } from "react";

// import api from "../../api";

// const UserContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//    const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);
// // ✅ useNavigate at top level

//   // ✅ Logout user
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//     navigate("/"); // redirect to login page
//   };

//   // ✅ Login user
//   const login = (userData, token) => {
//     setUser(userData);
//     setEmployee(employeeData)
//     if (token) localStorage.setItem("token", token);
//   };

//   // ✅ Setup Axios interceptors (only once)
//   useEffect(() => {
//     const reqInterceptor = api.interceptors.request.use((config) => {
//       const token = localStorage.getItem("token");
//       if (token) config.headers.Authorization = `Bearer ${token}`;
//       return config;
//     });

//     const resInterceptor = api.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) logout(); // auto-logout if unauthorized
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       api.interceptors.request.eject(reqInterceptor);
//       api.interceptors.response.eject(resInterceptor);
//     };
//   }, []);

//   // ✅ Verify user on app start
//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const res = await api.get("/users/verify");
//         setUser(res.data.user || null);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     verifyUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // ✅ Custom hook for easy access
// export const useAuth = () => useContext(UserContext);

// export default AuthProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);


  // ✅ Logout user
  const logout = () => {
      const navigate = useNavigate();
    setUser(null);
    setEmployee(null);
    localStorage.removeItem("token");
    navigate("/"); 
  };

  // ✅ Login user
  const login = (userData, employeeData, token) => {
    setUser(userData);
    setEmployee(employeeData);
    if (token) localStorage.setItem("token", token);
  };

  // ✅ Setup Axios interceptors
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    const resInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) logout();
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
  }, []);

  // ✅ Verify user on app start
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await api.get("/users/verify");
        setUser(res.data.user || null);
        setEmployee(res.data.employee || null);
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

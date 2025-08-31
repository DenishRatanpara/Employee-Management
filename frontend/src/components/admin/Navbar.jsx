import React, { useEffect, useState } from "react";
import api from "../../../api";
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  const handleLogout = async () => {
    // localStorage.removeItem("token");
    // window.location.href = "/"; // Or use navigate("/") if using react-router

     try {
    await api.post("/users/logout", {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.removeItem("token");
    window.location.href = "/"; // or navigate("/") if using react-router
  }
  };

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/users/verify", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // Assuming backend sends { success: true, user: { name: "Denish" } }
  //       if (response.data?.user) {
  //         setUsername(response.data.user.name);
  //       }
  //     } catch (error) {
  //       console.error("User verification failed:", error);
  //       handleLogout(); // Auto logout if token invalid
  //     }
  //   };

  //   if (token) {
  //     verifyUser();
  //   } else {
  //     handleLogout();
  //   }
  // }, [token]);

  return (
    <nav className="w-full bg-zinc-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          👋 Welcome, <span className="text-indigo-400">{user.name}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

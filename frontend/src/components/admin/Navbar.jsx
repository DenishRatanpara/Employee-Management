import React from "react";
import api from "../../../api";  // ✅ use your centralized API instance
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      // Call backend logout API
      await api.post(
        "/users/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Always clear token on client-side
      localStorage.removeItem("token");
      window.location.href = "/"; // or navigate("/") if using react-router
    }
  };

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

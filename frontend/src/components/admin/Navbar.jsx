import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    // Example logout logic
    localStorage.removeItem("token");
    window.location.href = "/"; // or use navigate("/") if using react-router
  };

  const username = "Admin"; // Replace with dynamic username if available

  return (
    <nav className="w-full bg-zinc-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          👋 Welcome, <span className="text-indigo-400">{username}</span>
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

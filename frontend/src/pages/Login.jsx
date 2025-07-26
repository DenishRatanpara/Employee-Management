import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      const res = await axios.post("http://localhost:4000/users/login", {
        email,
        password,
      });
      console.log(res.data);
      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/emp");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(message);
      console.error("Login failed:", message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm font-medium text-center bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right text-sm text-pink-600 hover:underline cursor-pointer">
            Forgot password?
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-xl font-semibold transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span className="text-pink-600 font-medium hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

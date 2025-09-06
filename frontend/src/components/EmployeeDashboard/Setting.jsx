import React, { useState } from "react";
import api from "../../../api";
import { useAuth } from "../../context/AuthProvider";

const Setting = () => {
    const {user}=useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

 const handleChangePassword = async (e) => {
  e.preventDefault();
  setMessage(null);
  setError(null);

  if (newPassword !== confirmPassword) {
    setError("New password and confirm password do not match!");
    return;
  }

  try {
    const res = await api.put("/settings/change-password", {
      userId: user._id,
      oldpassword: oldPassword,
      newpassword: newPassword,
    });

    setMessage(res.data.message || "Password changed successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    setError(
      err.response?.data?.message || "Failed to change password. Try again."
    );
  }
};


  return (
    <div className="h-fit flex items-center justify-center bg-gray-100   px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg mt-5 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Change Password
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm font-medium text-center bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 text-green-600 text-sm font-medium text-center bg-green-100 p-2 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-5">
          

          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter old password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition duration-200 ease-in-out"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Setting;

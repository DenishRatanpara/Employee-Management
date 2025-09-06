import React from "react";
import Navbar from "../components/admin/Navbar";
import EmployeeSidebar from "../components/EmployeeDashboard/EmployeeSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

const EmployeeDashboard = () => {
  const { employee, user, loading } = useAuth();
  console.log({employee, user})
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Redirect if not logged in
      if (!user) {
        navigate("/");
      } else if (user && user.role !== "employee") {
        navigate("/unauthorized");
      }
    }
  }, [user, employee, loading, navigate]);

  // Show loader while auth is being verified
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-700">Loading...</div>;
  }

  return (
    <div className="flex">
      <EmployeeSidebar />
      <div className="h-screen w-full bg-gray-100">
        <Navbar />
        <div className="px-4 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

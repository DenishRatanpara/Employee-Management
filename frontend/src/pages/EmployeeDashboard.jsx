import React from "react";
import Navbar from "../components/admin/Navbar";
import EmployeeSidebar from "../components/EmployeeDashboard/EmployeeSidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// const EmployeeDashboard = () => {
//    const { employee ,user} = useAuth();
//     const navigate = useNavigate();
//    useEffect(() => {
//       // Save user session in sessionStorage
//       if (employee) {
//         sessionStorage.setItem("employee", JSON.stringify(employee));
//       }
  
//       // Admin-only check
//       if (!employee) {
//         navigate("/login"); // Not logged in
//       } else if (user.role !== "admin") {
//         navigate("/unauthorized"); // Logged in but not admin
//       }
//     }, [user,employee, navigate]);
const EmployeeDashboard = () => {
  const { employee, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Save employee session
    if (employee) {
      sessionStorage.setItem("employee", JSON.stringify(employee));
    }

    // Redirect if not logged in as employee
    if (!employee) {
      navigate("/login"); 
    } else if (user.role !== "employee") {
      navigate("/unauthorized"); // Logged in but wrong role
    }
  }, [user, employee, navigate]);
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

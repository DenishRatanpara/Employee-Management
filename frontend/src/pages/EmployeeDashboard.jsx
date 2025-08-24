import React from "react";
import Navbar from "../components/admin/Navbar";
import EmployeeSidebar from "../components/EmployeeDashboard/EmployeeSidebar";
import { Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
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

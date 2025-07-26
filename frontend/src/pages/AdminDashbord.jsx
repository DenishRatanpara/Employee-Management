import React from "react";
import { useAuth } from "../context/AuthProvider";
import AdminSidebar from "../components/admin/AdminSidebar";
import Navbar from "../components/admin/Navbar";
import AdminSummery from "../components/admin/AdminSummery";
import { Outlet } from "react-router-dom";

const AdminDashbord = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <AdminSidebar></AdminSidebar>
      <div className="h-screen w-full bg-gray-100">
        <Navbar></Navbar>
        <div className="px-4 py-6">
          {/* <AdminSummery></AdminSummery> */}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminDashbord;

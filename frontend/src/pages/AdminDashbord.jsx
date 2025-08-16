// import React from "react";
// import { useAuth } from "../context/AuthProvider";
// import AdminSidebar from "../components/admin/AdminSidebar";
// import Navbar from "../components/admin/Navbar";
// import AdminSummery from "../components/admin/AdminSummery";
// import { Outlet } from "react-router-dom";

// const AdminDashbord = () => {
//   const { user } = useAuth();

//   return (
//     <div className="flex">
//       <AdminSidebar></AdminSidebar>
//       <div className="h-screen w-full bg-gray-100">
//         <Navbar></Navbar>
//         <div className="px-4 py-6">
//           {/* <AdminSummery></AdminSummery> */}
//           <Outlet></Outlet>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashbord;
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import AdminSidebar from "../components/admin/AdminSidebar";
import Navbar from "../components/admin/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashbord = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Save user session in sessionStorage
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }

    // Admin-only check
    if (!user) {
      navigate("/login"); // Not logged in
    } else if (user.role !== "admin") {
      navigate("/unauthorized"); // Logged in but not admin
    }
  }, [user, navigate]);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="h-screen w-full bg-gray-100">
        <Navbar />
        <div className="px-4 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashbord;

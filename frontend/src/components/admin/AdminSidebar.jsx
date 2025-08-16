import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  Building2Icon,
  CalendarCheck2Icon,
  WalletIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon size={20} />, to: "/admin/dashboard" },
    { name: "Employee", icon: <UsersIcon size={20} />, to: "/admin/employee" },
    {
      name: "Department",
      icon: <Building2Icon size={20} />,
      to: "/admin/departments",
    },
    {
      name: "Leave",
      icon: <CalendarCheck2Icon size={20} />,
      to: "/admin/leave",
    },
    {
      name: "Salary",
      icon: <WalletIcon size={20} />,
      to: "/admin/employee/salary/add",
    },
    {
      name: "Settings",
      icon: <SettingsIcon size={20} />,
      to: "/admin/settings",
    },
  ];

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      <button className="md:hidden p-3 m-2" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-64 h-screen bg-gray-900 text-white fixed md:relative z-20`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-gray-700 ${
                  isActive ? "bg-gray-800 font-semibold" : "text-gray-300"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;

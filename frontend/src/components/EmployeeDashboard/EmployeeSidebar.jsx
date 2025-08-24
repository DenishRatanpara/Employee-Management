import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CalendarCheck2Icon,
  WalletIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

const EmployeeSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <HomeIcon size={20} />,
      to: "/emp/dashboard",
    },
    {
      name: "My Profile",
      icon: <User className="w-5 h-5" />,
      to: `/emp/profile/${user._id}`, // fixed: changed from "path" to "to"
    },
    {
      name: "My Leave",
      icon: <CalendarCheck2Icon size={20} />,
      to: "/emp/leave",
    },
    {
      name: "My Salary",
      icon: <WalletIcon size={20} />,
      to: "/emp/salary",
    },
    {
      name: "Settings",
      icon: <SettingsIcon size={20} />,
      to: "/emp/settings",
    },
  ];

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 m-2 text-gray-700 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-gray-900 text-white transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Employee Panel
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition 
                hover:bg-gray-700 ${
                  isActive
                    ? "bg-gray-800 text-white font-semibold"
                    : "text-gray-300"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default EmployeeSidebar;


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  CalendarCheck2,
  WalletIcon ,
  Settings,
  Menu,
  X,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

const EmployeeSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { employee } = useAuth();
  

const menuItems = [
  {
    name: "Dashboard",
    icon: <Home size={20} />,
    to: "/emp/dashboard",
  },
  {
    name: "My Profile",
    icon: <User size={20} />,
    to: user ? `/emp/profile/${user._id}` : "/emp/profile",
  },
  {
    name: "My Leave",
    icon: <CalendarCheck2 size={20} />,
    to: "/emp/leave",
  },
  {
    name: "My Salary",
    icon: <WalletIcon size={20} />,
    to: `/emp/salary/${user._id}` 
  },
  {
    name: "Settings",
    icon: <Settings size={20} />,
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
        {isOpen ? <X /> : <Menu />}
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

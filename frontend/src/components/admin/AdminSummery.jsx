// import React from "react";
// import {
//   UsersIcon,
//   Building2Icon,
//   CalendarClockIcon,
//   WalletIcon,
//   SettingsIcon,
// } from "lucide-react"; // optional, remove if you don't want icons

// const stats = [
//   {
//     title: "Total Employees",
//     value: 120,
//     icon: <UsersIcon size={28} />,
//     bg: "bg-indigo-500",
//   },
//   {
//     title: "Departments",
//     value: 8,
//     icon: <Building2Icon size={28} />,
//     bg: "bg-green-500",
//   },
//   {
//     title: "Pending Leaves",
//     value: 5,
//     icon: <CalendarClockIcon size={28} />,
//     bg: "bg-yellow-500",
//   },
//   {
//     title: "Monthly Salary Paid",
//     value: "₹8.5L",
//     icon: <WalletIcon size={28} />,
//     bg: "bg-purple-500",
//   },
//   {
//     title: "Settings Accessed",
//     value: 14,
//     icon: <SettingsIcon size={28} />,
//     bg: "bg-red-500",
//   },
// ];

// const AdminSummery = () => {
//   return (

//     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

//       {stats.map((item, idx) => (
//         <div
//           key={idx}
//           className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md transition hover:shadow-lg"
//         >
//           <div className={`p-3 rounded-full text-white ${item.bg}`}>
//             {item.icon}
//           </div>
//           <div>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {item.title}
//             </p>
//             <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
//               {item.value}
//             </h2>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminSummery;
import React from "react";
import {
  UsersIcon,
  Building2Icon,
  CalendarClockIcon,
  WalletIcon,
  SettingsIcon,
} from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: 120,
    icon: <UsersIcon size={28} />,
    bg: "bg-indigo-500",
  },
  {
    title: "Departments",
    value: 8,
    icon: <Building2Icon size={28} />,
    bg: "bg-green-500",
  },
  {
    title: "Pending Leaves",
    value: 5,
    icon: <CalendarClockIcon size={28} />,
    bg: "bg-yellow-500",
  },
  {
    title: "Monthly Salary Paid",
    value: "₹8.5L",
    icon: <WalletIcon size={28} />,
    bg: "bg-purple-500",
  },
  {
    title: "Settings Accessed",
    value: 14,
    icon: <SettingsIcon size={28} />,
    bg: "bg-red-500",
  },
];

const AdminSummery = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>

      {/* Summary Cards - Flex Layout */}
      <div className="flex flex-wrap gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition w-full sm:w-[calc(50%-0.75rem)] xl:w-[calc(33.333%-1rem)]"
          >
            <div className={`p-3 rounded-full text-white ${item.bg}`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </p>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSummery;

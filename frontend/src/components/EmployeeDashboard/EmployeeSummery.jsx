import React from "react";
import {
  UserIcon,
  CalendarCheck2Icon,
  WalletIcon,
  BriefcaseIcon,
  AwardIcon,
} from "lucide-react";

const stats = [
  {
    title: "My Attendance",
    value: "95%",
    icon: <UserIcon size={28} />,
    bg: "bg-indigo-500",
  },
  {
    title: "Leaves Taken",
    value: 12,
    icon: <CalendarCheck2Icon size={28} />,
    bg: "bg-green-500",
  },
  {
    title: "Remaining Leaves",
    value: 8,
    icon: <CalendarCheck2Icon size={28} />,
    bg: "bg-yellow-500",
  },
  {
    title: "Monthly Salary",
    value: "₹55,000",
    icon: <WalletIcon size={28} />,
    bg: "bg-purple-500",
  },
  {
    title: "Projects Assigned",
    value: 3,
    icon: <BriefcaseIcon size={28} />,
    bg: "bg-blue-500",
  },
  {
    title: "Performance Rating",
    value: "⭐ 4.5",
    icon: <AwardIcon size={28} />,
    bg: "bg-pink-500",
  },
];

const EmployeeSummary = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Summary</h1>

      {/* Summary Cards */}
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

export default EmployeeSummary;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import "./EmpView.css"; // 👈 Import external CSS

const EmpView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(
          `/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setEmployee(response.data.employee);
        } else {
          console.error("Failed to fetch employee");
        }
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="animate-pulse text-lg font-medium text-indigo-600">
          Loading employee details...
        </p>
      </div>
    );
  }

  return (
    <div className="emp-view bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="emp-card max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-12 transition-all duration-300">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={`http://localhost:5000/${
              employee.userId?.profileImage || "default.jpg"
            }`}
            alt="Employee"
            className="emp-avatar w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-md hover:scale-105 transition-transform duration-300"
          />
          <div className="text-center sm:text-left space-y-1">
            <h2 className="emp-name text-3xl font-bold text-gray-800">
              {employee.userId?.name}
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Department:</span>{" "}
              {employee.department?.departmentName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Designation:</span>{" "}
              {employee.designation}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">DOB:</span>{" "}
              {new Date(employee.dob).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span>{" "}
              {employee.userId?.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Phone:</span> {employee.phone}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 border-t pt-6">
          <h3 className="emp-section-title text-xl font-semibold text-gray-700 mb-3">
            Additional Information
          </h3>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 pl-2">
            <li>
              <span className="font-medium">Employee ID:</span>{" "}
              {employee.employeeId}
            </li>
            <li>
              <span className="font-medium">Salary:</span> ₹
              {employee.salary.toLocaleString()}
            </li>
            <li>
              <span className="font-medium">Gender:</span> {employee.gender}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmpView;

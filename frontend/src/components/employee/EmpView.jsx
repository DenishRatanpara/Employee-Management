import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmpView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setEmployee(response.data);
          console.log(response.data);
        } else {
          console.error("Failed to fetch department");
        }
      } catch (error) {
        console.error("Error fetching department:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading employee details...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200  py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 sm:p-12 transition-all duration-300">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={`http://localhost:4000/${
              employee.userId?.profileImage || "default.jpg"
            }`}
            alt="Employee"
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-500 shadow-md hover:scale-105 transition-transform duration-300"
          />
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-3xl font-bold text-gray-800">
              {employee.empname}
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Department:</span>{" "}
              {employee.department.departmentName}
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
              {employee.userId.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Phone:</span> {employee.phone}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Additional Information
          </h3>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 pl-2">
            <li>
              <span className="font-medium">Employee ID:</span>{" "}
              {employee.employeeId}
            </li>
            {/* Add more fields here if needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmpView;

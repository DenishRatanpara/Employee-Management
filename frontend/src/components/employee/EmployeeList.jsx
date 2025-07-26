import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import EmployeeButton from "../../utils/EmployeeHelper";
import axios from "axios";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  // Filter employees based on search input
  const filtered = employees.filter((emp) =>
    emp.empname.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / employeesPerPage);
  const paginatedEmployees = filtered.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get("http://localhost:4000/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        console.log(response.data);
        if (response.status === 200) {
          const data = response.data.map((emp) => ({
            _id: emp._id,
            empname: emp.userId?.name || "N/A",
            dob: new Date(emp.dob).toDateString() || "N/A",
            profileImage: `http://localhost:4000/${
              emp.userId?.profileImage || ""
            }`,

            department: emp.department.departmentName || "N/A",
          }));

          setEmployees(data);
        } else {
          console.error("Failed to fetch employees");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployee();
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-5 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Employee List</h2>
          <button
            onClick={() => navigate("/admin/add-employee")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Add Employee
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search employee by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full table-auto text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 font-semibold">
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">DOB</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((emp, index) => (
                <tr
                  key={emp._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    {(currentPage - 1) * employeesPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={emp.profileImage}
                      alt={emp.empname}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{emp.empname}</td>
                  <td className="px-4 py-3">{emp.dob}</td>
                  <td className="px-4 py-3">{emp.department}</td>

                  <EmployeeButton id={emp._id} />
                </tr>
              ))}
              {paginatedEmployees.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center pt-4">
          <div className="inline-flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg border ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;

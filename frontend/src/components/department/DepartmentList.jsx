import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DepartmentButton from "../../utils/DepartmentButton";
import axios from "axios";

const DepartmentList = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const departmentsPerPage = 5;

  const handleDelete = (id) => {
    setDepartments(departments.filter((dep) => dep.id !== id));
  };

  const filteredDepartments = departments.filter((dep) =>
    dep.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * departmentsPerPage;
  const indexOfFirst = indexOfLast - departmentsPerPage;
  const currentDepartments = filteredDepartments.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/department/get",

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.map((dep, id) => ({
            id: dep._id,
            name: dep.departmentName,
          }));

          setDepartments(data);
        } else {
          console.error("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartment();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Departments</h2>
        <button
          onClick={() => navigate("/admin/add-department")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search department..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                NO
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Department
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentDepartments.length > 0 ? (
              currentDepartments.map((dep, index) => (
                <tr key={dep.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {indexOfFirst + index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {dep.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <DepartmentButton id={dep.id} handleDelete={handleDelete} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No departments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-1 rounded-lg border ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;

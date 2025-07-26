import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddDepartment = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    departmentName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Department added successfully:", response.data);
      navigate("/admin/departments");
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Department
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Department Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Department Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="departmentName"
              value={department.departmentName}
              onChange={handleChange}
              placeholder="Enter department name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={department.description}
              onChange={handleChange}
              placeholder="Enter department description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-sm"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;

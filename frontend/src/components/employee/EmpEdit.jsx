import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import api from "../../../api";

const EmpEdit = () => {
  const [departments, setDepartments] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    role: "",
    salary: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

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
          const emp = response.data;
          setEmployee(emp);

          setFormData({
            name: emp.userId?.name || "",
            email: emp.userId?.email || "",
            phone: emp.userId?.phone || "",
            department: emp.department?._id || "",
            designation: emp.designation || "",
            role: emp.userId.role || "",
            salary: emp.salary || "",
          });
        } else {
          console.error("Failed to fetch Employee");
        }
      } catch (error) {
        console.error("Error fetching Employee:", error);
      }
    };

    const fetchAllDepartments = async () => {
      const result = await fetchDepartments();
      if (result) {
        setDepartments(result);
      }
    };

    fetchEmployee();
    fetchAllDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.put(
        `http://localhost:4000/employee/update/${id}`, // Assuming PUT for update
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Employee updated successfully:", response.data);
      navigate("/admin/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  if (!employee || !employee.userId) {
    return <div className="text-center p-10">Loading employee data...</div>;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl p-5 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Edit Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-wrap gap-6">
            {/* Full Name */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                name="name"
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Phone */}

            {/* Department */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Department</option>
                {departments.map((dep, _id) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Designation
              </label>
              <input
                type="text"
                value={formData.designation}
                name="designation"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Role */}

            {/* Salary */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Salary (₹) *
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                placeholder="40000"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpEdit;

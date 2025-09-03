import React, { useState, useEffect } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import api from "../../../api.js";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    department: "",
    designation: "",
    role: "",
    salary: "",
    employeeId: "",
    password: "",
    address: "",
    profileImage: null,
  });

  // console.log("form data: ", formData);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
        // console.log("fetch department: ", data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };
    getDepartment();
  }, []);

  

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage" && files?.length > 0) {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });


    try {
      const response = await api.post("/employee/add", formDataObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Employee created successfully:", response.data);
      navigate("/admin/employee");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-auto p-5 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Employee
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
                name="name"
                value={formData.name}
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 9876543210"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Gender */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* DOB */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

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
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.departmentName}
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Designation *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Role */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Role</option>
                <option value="admin">admin</option>

                <option value="employee">employee</option>
              </select>
            </div>

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

            {/* Employee ID */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Employee ID *
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                placeholder="EMP12345"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="w-full md:w-[48%]">
              <label className="block text-gray-700 font-medium mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="*******"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Address */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                required
                placeholder="123 Street, City, State"
                className="w-full px-4 py-2 border rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Photo */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">
                Upload Photo
              </label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-gray-700"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";

const AddSalary = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    employee: "",
    allowance: "",
    payDate: "",
    basicSalary: "",
    deduction: "",
  });
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
            name: emp.userId?.name || "N/A",

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

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };
    getDepartments();
  }, []);

  //   useEffect(() => {
  //     const getEmployees = async () => {
  //       if (formData.department) {
  //         try {
  //           const data = await fetchEmployeesByDepartment(formData.department);
  //           setEmployees(data);
  //         } catch (error) {
  //           console.error("Failed to fetch employees:", error);
  //         }
  //       } else {
  //         setEmployees([]); // clear employees if no department
  //       }
  //     };
  //     getEmployees();
  //   }, [formData.department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Salary Data:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Salary
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Department */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>

        {/* Employee */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Employee</label>
          <select
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!employees.length}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Allowance */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Allowance</label>
          <input
            type="number"
            name="allowance"
            value={formData.allowance}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Pay Date */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Pay Date</label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Basic Salary */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Deduction */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Deduction</label>
          <input
            type="number"
            name="deduction"
            value={formData.deduction}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalary;

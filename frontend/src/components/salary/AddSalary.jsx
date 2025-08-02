import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import { getEmployees } from "../../utils/EmployeeHelper";
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
    deductions: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleDepartmentChange = async (e) => {
    const selectedDept = e.target.value;
    try {
      setIsLoading(true);
      const emps = await getEmployees(selectedDept);
      setEmployees(emps);
      setFormData((prev) => ({
        ...prev,
        department: selectedDept,
        employee: "", // Reset employee when department changes
      }));
    } catch (err) {
      setError("Failed to fetch employees for selected department");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getDepartments = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (err) {
        setError("Failed to fetch departments");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      await axios.post("http://localhost:4000/salary/add", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Salary Data:", formData);
      // Optionally navigate after successful submission
      // navigate('/salaries');
    } catch (err) {
      setError("Failed to submit salary data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Salary
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Department */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleDepartmentChange}
            required
            disabled={isLoading}
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
            disabled={!formData.department || isLoading}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.userId.name || emp.id}{" "}
                {/* Display name if available, otherwise ID */}
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
            min="0"
            step="0.01"
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
            min="0"
            step="0.01"
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
            min="0"
            step="0.01"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalary;

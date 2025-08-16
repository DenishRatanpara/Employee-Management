import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";

const AddSalary = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    employeeId: "",
    basicSalary: "",
    allowance: 0,
    deductions: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch departments on mount
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

  const handleDepartmentChange = async (e) => {
    const selectedDept = e.target.value;
    setFormData((prev) => ({
      ...prev,
      department: selectedDept,
      employeeId: "",
    }));

    try {
      setIsLoading(true);
      const emps = await getEmployees(selectedDept);
      setEmployees(emps);
    } catch (err) {
      setError("Failed to fetch employees for selected department");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setIsLoading(true);
      const payload = {
        employeeId: formData.employeeId,
        basicSalary: Number(formData.basicSalary),
        allowance: Number(formData.allowance),
        deductions: Number(formData.deductions),
      };

      const res = await axios.post(
        "http://localhost:4000/salary/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigate("/salary"); // or wherever you list salaries
      } else {
        setError("Failed to add salary. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Something went wrong!");
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
            onChange={handleDepartmentChange}
            required
            disabled={isLoading}
            className="flex-1 px-4 py-2 border rounded-lg"
            value={formData.department}
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
            name="employeeId"
            onChange={handleChange}
            required
            disabled={!formData.department || isLoading}
            className="flex-1 px-4 py-2 border rounded-lg"
            value={formData.employeeId}
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.employeeId || emp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Basic Salary */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Basic Salary</label>
          <input
            type="number"
            name="basicSalary"
            onChange={handleChange}
            value={formData.basicSalary}
            required
            min="0"
            step="0.01"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Allowance */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Allowance</label>
          <input
            type="number"
            name="allowance"
            onChange={handleChange}
            value={formData.allowance}
            min="0"
            step="0.01"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Deductions */}
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Deductions</label>
          <input
            type="number"
            name="deductions"
            onChange={handleChange}
            value={formData.deductions}
            min="0"
            step="0.01"
            className="flex-1 px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex items-center space-x-6">
          <label className="w-32 text-gray-700 font-medium">Pay Date</label>
          <input
            type="date"
            name="payDate"
            onChange={handleChange}
            required
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

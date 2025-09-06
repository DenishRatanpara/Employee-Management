
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";


const SalaryHistory = () => {
  const [salary, setSalary] = useState([]);
  const [search, setSearch] = useState("");
  const { id } = useParams();

  // Format date as "12 Aug 2025"
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Filter by formatted date
  const filteredData = salary.filter((item) => {
    const formatted = formatDate(item.paymentDate);
    return formatted.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const res = await api.get(`/salary/user-salary/${id}`);
        console.log(res.data.salary);

        if (Array.isArray(res.data)) {
          setSalary(res.data);
        } else if (res.data.salary) {
          setSalary(res.data.salary);
        } else {
          setSalary([]);
        }
      } catch (error) {
        console.error("Error fetching salary:", error);
        setSalary([]);
      }
    };
    fetchSalary();
  }, [id]);


  return (
    <div className="max-w-6xl mx-auto p-8 bg-base-100 rounded-2xl shadow-lg border border-gray-200">
      {/* Employee Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-primary">
          💼 Salary History
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Employee:{" "}
          <span className="font-semibold">
            {salary[0]?.employeeId?.employeeId || "Unknown"}
          </span>{" "}
          {/* (ID: {salary[0]?.employeeId?._id || "N/A"}) */}
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by Payment Date (e.g., 12 Aug 2025)"
          className="input input-bordered input-primary w-full shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-outline btn-primary"
          onClick={() => setSearch("")}
        >
          Clear
        </button>
      </div>

      {/* Salary History Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="table table-zebra w-full text-center">
          <thead>
            <tr className="bg-primary text-zinc-950 text-lg">
              <th>S.No</th>
              <th>Employee ID</th>
              <th>Basic Salary (₹)</th>
              <th>Allowance (₹)</th>
              <th>Deductions (₹)</th>
              <th>Net Salary (₹)</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                const total =
                  (item.basicSalary || 0) +
                  (item.allowance || 0) -
                  (item.deductions || 0);
                return (
                  <tr
                    key={item._id || index}
                    className="hover:bg-primary/10 transition"
                  >
                    <td>{index + 1}</td>
                    <td>{item.employeeId?.employeeId || "-"}</td>
                    <td className="text-green-600 font-semibold">
                      ₹{(item.basicSalary || 0).toLocaleString()}
                    </td>
                    <td className="text-blue-600 font-semibold">
                      ₹{(item.allowance || 0).toLocaleString()}
                    </td>
                    <td className="text-red-600 font-semibold">
                      ₹{(item.deductions || 0).toLocaleString()}
                    </td>
                    <td className="text-purple-600 font-bold">
                      ₹{total.toLocaleString()}
                    </td>
                    <td>{formatDate(item.paymentDate)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 italic py-4"
                >
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryHistory;

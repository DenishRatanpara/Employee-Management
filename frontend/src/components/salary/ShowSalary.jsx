import React, { useState } from "react";

const ShowSalary = () => {
  // Example salary history data

  const [search, setSearch] = useState("");

  // Format date as "12 Aug 2024"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredData = salaryHistory.filter((item) =>
    item.payDate.includes(search)
  );

  return (
    <div className="max-w-6xl mx-auto p-8 bg-base-100 rounded-2xl shadow-lg border border-gray-200">
      {/* Employee Header */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-extrabold text-primary">
          💼 Salary History
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Employee: <span className="font-semibold">John Doe</span> (ID:
          EMP-001)
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by Pay Date (YYYY-MM-DD)"
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
              <th>Salary (₹)</th>
              <th>Allowance (₹)</th>
              <th>Deduction (₹)</th>
              <th>Total (₹)</th>
              <th>Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                const total = item.salary + item.allowance - item.deduction;
                return (
                  <tr key={item.id} className="hover:bg-primary/10 transition">
                    <td>{index + 1}</td>
                    <td>{item.empId}</td>
                    <td className="text-green-600 font-semibold">
                      ₹{item.salary.toLocaleString()}
                    </td>
                    <td className="text-blue-600 font-semibold">
                      ₹{item.allowance.toLocaleString()}
                    </td>
                    <td className="text-red-600 font-semibold">
                      ₹{item.deduction.toLocaleString()}
                    </td>
                    <td className="text-purple-600 font-bold">
                      ₹{total.toLocaleString()}
                    </td>
                    <td>{formatDate(item.payDate)}</td>
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

export default ShowSalary;

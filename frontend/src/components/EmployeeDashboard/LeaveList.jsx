import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";

const LeaveList = () => {
  const [search, setSearch] = useState("");
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/leave/show/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLeaves(response.data.leaves);
        console.log(response.data.leaves);
      } catch (error) {
        console.error("Error fetching leaves:", error);
        toast.error("Failed to fetch leaves");
      }
    };
    fetchLeaves();
  }, []);

  // filter
  const filteredLeaves = leaves.filter(
    (leave) =>
      leave.name?.toLowerCase().includes(search.toLowerCase()) ||
      leave.leaveType?.toLowerCase().includes(search.toLowerCase()) ||
      leave.status?.toLowerCase().includes(search.toLowerCase())
  );

  // format date helper
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("en-GB") : "-";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Leave List
          </h1>

          <button
            onClick={() => navigate("/emp/add-leave")}
            className="btn btn-primary flex items-center gap-2 rounded-xl px-5 shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={18} /> Add Leave
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 p-3 m-3 flex justify-center">
          <div className="relative w-full max-w-lg">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search by name, type, or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input w-full rounded-2xl pl-10 pr-4 py-3 border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Leave Type</th>
                <th className="py-3 px-4 text-left">From</th>
                <th className="py-3 px-4 text-left">To</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaves.length > 0 ? (
                filteredLeaves.map((leave, index) => (
                  <tr key={leave._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-medium">{index + 1}</td>
                    <td className="py-3 px-4">{leave.name}</td>
                    <td className="py-3 px-4">{leave.leaveType}</td>
                    <td className="py-3 px-4">{formatDate(leave.fromDate)}</td>
                    <td className="py-3 px-4">{formatDate(leave.toDate)}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : leave.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-6">
                    🚫 No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveList;

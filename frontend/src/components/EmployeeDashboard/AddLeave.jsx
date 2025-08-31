import React, { useState } from "react";
import { Calendar, FileText } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

const AddLeave = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });
  const navigate = useNavigate();

  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting leave request...");

    try {
      const payload = {
        ...formData,
        userId: user?._id, // ✅ logged-in user ID
      };

      await axios.post("http://localhost:4000/leave/add-leave", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Leave applied successfully! ✅", { id: toastId });
      setFormData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });
      navigate("/emp/leave");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    }
  };

  return (
    <>
      {/* ✅ Toast container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <div className="h-fit flex items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              📝 Apply for Leave
            </h2>
            <p className="text-blue-100 text-sm">
              Fill out the form below to request your leave
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Leave Type */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Leave Type
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                className="select select-bordered w-full rounded-xl"
                required
              >
                <option value="">Select leave type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* From Date */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                From Date
              </label>
              <div className="flex items-center border rounded-xl px-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  className="input w-full border-0 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* To Date */}
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                To Date
              </label>
              <div className="flex items-center border rounded-xl px-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  className="input w-full border-0 focus:ring-0"
                  required
                />
              </div>
            </div>

            {/* Reason */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold text-gray-700">
                Reason
              </label>
              <div className="flex items-start border rounded-xl px-3">
                <FileText className="w-5 h-5 text-gray-400 mt-3" />
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Write your reason..."
                  className="textarea w-full border-0 focus:ring-0"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
              >
                Submit Leave
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLeave;

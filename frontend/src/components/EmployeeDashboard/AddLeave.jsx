import React from "react";
import { User, Calendar, FileText } from "lucide-react"; // icons

const AddLeave = () => {
  return (
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
        <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee Name */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Employee Name
            </label>
            <div className="flex items-center border rounded-xl px-3">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                className="input w-full border-0 focus:ring-0"
              />
            </div>
          </div>

          {/* Leave Type */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Leave Type
            </label>
            <select className="select select-bordered w-full rounded-xl">
              <option disabled selected>
                Select leave type
              </option>
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Annual Leave</option>
              <option>Maternity Leave</option>
              <option>Other</option>
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
                className="input w-full border-0 focus:ring-0"
              />
            </div>
          </div>

          {/* To Date */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">To Date</label>
            <div className="flex items-center border rounded-xl px-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                className="input w-full border-0 focus:ring-0"
              />
            </div>
          </div>

          {/* Reason */}
          <div className="form-control md:col-span-2">
            <label className="label font-semibold text-gray-700">Reason</label>
            <div className="flex items-start border rounded-xl px-3">
              <FileText className="w-5 h-5 text-gray-400 mt-3" />
              <textarea
                placeholder="Write your reason..."
                className="textarea w-full border-0 focus:ring-0"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition">
              Submit Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;

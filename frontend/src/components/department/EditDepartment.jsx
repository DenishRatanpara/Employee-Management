import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../../api'

const EditDepartment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [departments, setDepartments] = useState({
    departmentName: "",
    description: "",
  });

  // useEffect(() => {
  //   const fetchDepartment = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:4000/department/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         setDepartment(response.data);
  //       } else {
  //         console.error("Failed to fetch department");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching department:", error);
  //     }
  //   };

  //   fetchDepartment();
  // }, [id]);
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await api.get(
          "/department/get",

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.map((dep, id) => ({
            id: dep._id,
            name: dep.departmentName,
          }));

          setDepartments(data);
          console.log(data);
        } else {
          console.error("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartment();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartments((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/department/update/${id}`,
        departments,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Department updated successfully:", response.data);
      navigate("/admin/departments");
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Department
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Department Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="departmentName"
              value={departments.name}
              onChange={handleChange}
              placeholder="Enter department name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Enter department description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-sm"
            >
              Edit Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;

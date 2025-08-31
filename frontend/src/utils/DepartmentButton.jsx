import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const DepartmentButton = ({ id, handleDelete }) => {
  const navigate = useNavigate();

  const handleOnDelete = async ({ id }) => {
    try {
      const response = await api.delete(
        `/department/delete/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Department delete successfully:", response.data);
      handleDelete(id);
      navigate("/admin/departments");
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => navigate(`/admin/department/${id}`)}
        className="text-blue-500 hover:text-blue-700"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleOnDelete({ id })}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default DepartmentButton;

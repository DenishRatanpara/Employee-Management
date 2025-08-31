import { Eye, Pencil, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

// Fetch all departments from backend
export const fetchDepartments = async () => {
  try {
    const response = await api.get("/department/get", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data.map((dep) => ({
        _id: dep._id,
        name: dep.departmentName,
      }));
    } else {
      console.error("Failed to fetch departments");
      return [];
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

export const getEmployees = async (id) => {
  try {
    const response = await api.get(
      `/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const employees = response.data.employees;

      if (!Array.isArray(employees)) {
        console.error("Expected employees to be an array, but got:", employees);
        return [];
      }

      console.log("Employees fetched successfully:", employees);
      return employees;
    } else {
      console.error("Failed to fetch employees");
      return [];
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

// Action buttons for each employee row
const EmployeeButton = ({ id }) => {
  const navigate = useNavigate();

  return (
    <td className="px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(`/admin/employee/view/${id}`)}
          className="text-blue-500 hover:text-blue-700"
          title="View"
        >
          <Eye size={16} />
        </button>
        <button
          onClick={() => navigate(`/admin/employee/edit/${id}`)}
          className="text-yellow-500 hover:text-yellow-700"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => navigate(`/admin/employee/salary/${id}`)}
          className="text-green-500 hover:text-green-700"
          title="Salary"
        >
          <DollarSign size={16} />
        </button>
        <button
          onClick={() => navigate(`/admin/employee/attendance/${id}`)}
          className="text-purple-500 hover:text-purple-700"
          title="Attendance"
        >
          <Calendar size={16} />
        </button>
      </div>
    </td>
  );
};

export default EmployeeButton;

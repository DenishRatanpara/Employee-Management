import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashbord from "./pages/AdminDashbord";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoute from "./utils/PrivateRoute";
import RoleBaseRoute from "./utils/RoleBaseRoute";
import AdminSummery from "./components/admin/AdminSummery";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import EmpView from "./components/employee/EmpView";
import EmpEdit from "./components/employee/EmpEdit";
import AddSalary from "./components/salary/AddSalary";
import ShowSalary from "./components/salary/ShowSalary";
import EmployeeSummary from "./components/EmployeeDashboard/EmployeeSummery";
import LeaveList from "./components/EmployeeDashboard/LeaveList";
import AddLeave from "./components/EmployeeDashboard/AddLeave";
import Setting from "./components/EmployeeDashboard/Setting";
import SalaryHistory from "./components/EmployeeDashboard/SalaryHistory";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["admin"]}>
                <AdminDashbord />
              </RoleBaseRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminSummery />} />
          <Route path="/admin/dashboard" element={<AdminSummery />} />
          <Route path="/admin/add-department" element={<AddDepartment />} />
          <Route path="/admin/departments" element={<DepartmentList />} />
          <Route path="/admin/department/:id" element={<EditDepartment />} />
          <Route path="/admin/employee" element={<EmployeeList />} />
          <Route path="/admin/employee/view/:id" element={<EmpView />} />
          <Route path="/admin/employee/edit/:id" element={<EmpEdit />} />
          <Route path="/admin/add-employee" element={<AddEmployee />} />
          <Route path="/admin/employee/salary/add" element={<AddSalary />} />
          <Route path="/admin/employee/salary/:id" element={<ShowSalary />} />
        </Route>

        <Route
          path="/unauthorized"
          element={<div className="text-red-500">Unauthorized Access</div>}
        />

        <Route
          path="/emp"
          element={
            <PrivateRoute>
              <RoleBaseRoute requiredRole={["employee"]}>
                <EmployeeDashboard></EmployeeDashboard>
              </RoleBaseRoute>
            </PrivateRoute>
          }
        >
          <Route index element={<EmployeeSummary />} />
          <Route path="/emp/dashboard" element={<EmployeeSummary />} />
          <Route path="/emp/profile/:id" element={<EmpView />} />
          <Route path="/emp/leave/" element={<LeaveList />} />
          <Route path="/emp/add-leave" element={<AddLeave />} />
             <Route path="/emp/salary/:id" element={<SalaryHistory />} />
              <Route path="/emp/settings/" element={<Setting/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import express from "express";
import verify from "../middlewares/user.middleware.js";
import * as departmentController from "../controllers/department.controller.js";

const router = express.Router();

// Add a new department
router.get("/get", verify, departmentController.getDepartments);
router.post("/add", verify, departmentController.addDepartment);
// router.get("/edit/:id", verify, departmentController.editDepartment);
router.put("/update/:id", verify, departmentController.updateDepartment);
router.delete("/delete/:id", verify, departmentController.deleteDepartment);

export default router;

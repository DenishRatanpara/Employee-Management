import express from 'express';
import * as  userController from "../controllers/user.controller.js"
import * as empController from "../controllers/emp.controller.js"
import upload from '../controllers/multer.js';
import verifyUser from "../middlewares/user.middleware.js";


const router =express.Router();

router.post('/add',verifyUser,upload.single("profileImage"),empController.EmpAddController)
router.get('/',verifyUser,empController.getEmployeeController)
router.get('/:id',verifyUser,empController.ShowEmployeeController)
router.put('/update/:id',verifyUser,empController.EmpUpdateController)
router.get('/department/:id',verifyUser,empController.fatchEmpByDepartmentController)

export default router;
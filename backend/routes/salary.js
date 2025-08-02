import express from 'express';
import * as salaryController from "../controllers/salary.controller.js";
import verifyUser from "../middlewares/user.middleware.js"; 

const router = express.Router();

router.post('/add',  salaryController.addSalaryController);

export default router;
import express from 'express';
import * as salaryController from "../controllers/salary.controller.js";
import verifyUser from "../middlewares/user.middleware.js"; 

const router = express.Router();

router.post('/add',  salaryController.addSalaryController);
router.get('/show/:id',verifyUser,salaryController.showSalaryController)


export default router;
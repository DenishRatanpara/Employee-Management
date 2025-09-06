import express from 'express';
import * as salaryController from "../controllers/salary.controller.js";


const router = express.Router();

router.post('/add',  salaryController.addSalaryController);
router.get('/show/:id',salaryController.showSalaryController)
router.get('/user-salary/:id',salaryController.ShowSalaryByUserId)


export default router;
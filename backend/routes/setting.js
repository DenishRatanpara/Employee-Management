import Router from "express";
import * as settingController from "../controllers/setting.controller.js"

const router=Router();


router.put('/change-password',settingController.changePasswordController) 
export default router;
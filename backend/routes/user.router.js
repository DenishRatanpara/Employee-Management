import express from 'express';
import * as  userController from "../controllers/user.controller.js"
import verifyUser from "../middlewares/user.middleware.js";
import { refreshAccessToken } from '../controllers/user.controller.js';


// Create a new router instance

const router=express.Router();

router.post("/login",userController.LoginController);
router.get("/verify",verifyUser, userController.verify);
router.post("/logout", verifyUser, userController.LogoutController);
router.post("/refresh", refreshAccessToken)

export default router;
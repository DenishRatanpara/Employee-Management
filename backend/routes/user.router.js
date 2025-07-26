import express from 'express';
import * as  userController from "../controllers/user.controller.js"
import verifyUser from "../middlewares/user.middleware.js";


// Create a new router instance

const router=express.Router();

router.post("/login",userController.LoginController);
router.get("/verify",verifyUser, userController.verify);

export default router;
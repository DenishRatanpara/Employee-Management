import { Router} from "express";
import verifyUser from "../middlewares/user.middleware.js";
import * as leaveController from "../controllers/leave.controller.js"


const router =Router()

router.post('/add-leave',verifyUser,leaveController.applyLeave)
router.get('/show/:id',verifyUser,leaveController.FatchLeave)
export default router;
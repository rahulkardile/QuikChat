import { Router } from "express";
import authController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
import ChatGroupController from "../controllers/groupController";
const router = Router();

//Auth Routes
router.post("/auth/login", authController.login)

// Chat Group route
router.post("/chat-group", authMiddleware, ChatGroupController.store);

export default router;


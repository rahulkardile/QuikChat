import { Router } from "express";
import authController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
import ChatGroupController from "../controllers/groupController";
const router = Router();

//Auth Routes
router.post("/auth/login", authController.login)

// Chat Group route
router.get("/chat-group/:id", authMiddleware, ChatGroupController.show);
router.get("/all-chat-group", authMiddleware, ChatGroupController.index);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/update/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/delete/:id", authMiddleware, ChatGroupController.destroy);

export default router;


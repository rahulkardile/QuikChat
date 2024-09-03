import { Router } from "express";
import authController from "../controllers/userController";
const router = Router();

router.post("/auth/login", authController.login)

export default router;


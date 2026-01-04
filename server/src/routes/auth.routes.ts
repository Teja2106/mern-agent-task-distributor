import { Router } from "express";
import { login, logout } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', protect, logout);

export default authRouter;
import { Router } from "express";
import { Agents } from "../controllers/agents.controller";
import { protect } from "../middleware/auth.middleware";

const agentsRouter = Router();

agentsRouter.get('/agents', protect, Agents);

export default agentsRouter;
import { Router } from "express";
import { addAgent } from "../controllers/add-agent.controller";
import { protect } from "../middleware/auth.middleware";

const addAgentRouter = Router();

addAgentRouter.post('/add-agents', protect, addAgent);

export default addAgentRouter;
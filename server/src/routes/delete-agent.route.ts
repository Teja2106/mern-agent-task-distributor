import { Router } from "express";
import { deleteAgent } from "../controllers/delete-agent.controller";
import { protect } from "../middleware/auth.middleware";

const deleteAgentRouter = Router();

deleteAgentRouter.delete('/delete-agent', protect, deleteAgent);

export default deleteAgentRouter;
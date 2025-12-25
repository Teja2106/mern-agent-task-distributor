import { Router } from "express";
import { protect } from "../middleware/auth.middleware";

const protectedDashboard = Router();

protectedDashboard.get('/dashboard', protect, (req, res) => {
    res.json({ message: 'Welcome to dashbaord' });
});

export default protectedDashboard;
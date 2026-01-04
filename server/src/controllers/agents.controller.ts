import { type Request, type Response } from "express";
import { User } from "../models/user.model";

export const Agents = async (req: Request, res: Response) => {
    try {
        const agents = await User.find({ role: 'agent' }).select('name email phone').sort({ createdAt: -1 });

        return res.status(200).json(agents);
    } catch (error) {
        console.error('Fetch agents error: ', error);

        return res.status(500).json({ message: 'Internal server error' });
    }
}
import { type Request, type Response } from "express";
import { User } from "../models/user.model";

export const deleteAgent = async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;

        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        await User.deleteOne({ '_id': _id });

        res.status(204).json({ message: 'Agent deleted successfully' });
    } catch (error) {
        console.error('Error deleting agent: ', error);

        res.status(500).json({ message: 'Internal server error' });
    }
}
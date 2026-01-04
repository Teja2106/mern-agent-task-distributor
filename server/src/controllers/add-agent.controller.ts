import { type Request, type Response } from "express";
import { User } from "../models/user.model";

export const addAgent = async (req: Request, res: Response) => {
    try {
        const { fullname, email, phone, password } = req.body;

        const existingAgent = await User.findOne({ email: email });

        if (existingAgent) {
            return res.status(409).json({ message: 'Agent already exists' });
        }

        await User.create({
            name: fullname,
            email: email,
            role: 'agent',
            phone: phone,
            password: password   
        });

        res.status(201).json({ message: 'Agent added successfully' })
    } catch {
        console.log('Something went wrong');

        return res.status(500).json({ message: 'Internal server error' });
    }
}
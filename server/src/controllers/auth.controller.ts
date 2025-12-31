import { type Request, type Response } from "express";
import { dummyUser } from "../utils/dummyUser";
import { signToken } from "../utils/jwt";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email !== dummyUser.email || password !== dummyUser.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = await signToken({
        sub: dummyUser.id,
        email: dummyUser.email
    });

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000 // 1 hour
    });

    return res.status(200).json({ message: 'Login successful' });
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({ message: 'Logged out successfully' });
}
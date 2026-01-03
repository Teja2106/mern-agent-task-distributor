import { type Request, type Response } from "express";
import { signToken } from "../utils/jwt";
import bcrypt from 'bcrypt';
import { User } from "../models/user.model";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await signToken({
            sub: user._id.toString(),
            email: user.email,
        });

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000 //1 hr
        })

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error: ', error);

        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({ message: 'Logged out successfully' });
}
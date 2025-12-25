import { type Request, type Response, type NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const { payload } = await verifyToken(token);
        (req as any).user = payload;
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
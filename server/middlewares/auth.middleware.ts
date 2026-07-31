import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
   userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if(!token){
        res.status(401).json({message: 'Unauthorized access'});
        return;
    }

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        req.userId = payload.userId;
        next();
    } catch(e){
        console.error(e);
        res.status(401).json({message: 'Invalid token'});
    }
}
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'

export const signup = async (req: Request, res: Response) => {
    try{
        const { name, email, password } = req.body;
        const existing = await prisma.user.findUnique({ where: {email} });
        if (existing) {
            res.status(400).json({message: 'Email is already in use'})
            return;
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {name, email, password: hashed}
        });

        res.status(201).json({message: 'Account created', userId: user.id})
    } catch(e){
        console.error(e);
        res.status(500).json({message: 'Signup failed'})
    }
}

export const login = async(req: Request, res: Response) => {
    try{
        const {email, password} = req.body;

        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            res.status(400).json({message: 'Invalid credentials'});
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            res.status(401).json({message: 'Invalid credentials'});
            return;
        }

        const accessToken = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET!,
            { expiresIn: '15m'}
        );

        const refreshToken = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: '7d'}
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        });

        res.json({ accessToken, userId: user.id, name: user.name })
    } catch(e){
        console.error(e);
        res.status(500).json({message: 'Login failed'});
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refreshToken
        if (!token) {
            res.status(401).json({ message: 'No refresh token' })
            return
        }

        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string }

        const accessToken = jwt.sign(
            { userId: payload.userId },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        )

        res.json({ accessToken })
    } catch (e) {
        res.status(401).json({ message: 'Invalid refresh token' })
    }
}

export const logout = async(req: Request, res: Response) => {
    res.clearCookie('refreshToken');
    res.json({message: 'Logged out'})
};
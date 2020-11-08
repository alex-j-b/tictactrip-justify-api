import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export function generateAccessToken(email: string): string {
    return jwt.sign(
        { email: email },
        process.env.TOKEN_SECRET,
        { noTimestamp: true }
    );
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: string) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

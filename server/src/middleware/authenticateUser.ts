import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";

//decode Access Token
export const autheticateUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/auth')) {
        return next();
    }
    const authHeader = req.headers['authorization'];
    console.log('authHeader',authHeader);
    
    if (authHeader) {
        const [scheme, token] = authHeader.split(' ');
        if (scheme === 'Bearer' && token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
                if (err) throw new CustomError('Invalid access token', 403); 
                req.user = user;
            });

        } else {
            console.log('Invalid authorization scheme');
            return res.status(401).json({ error: 'Invalid authorization header' });
        }
    } else {
        throw new CustomError('No authorization header found', 401);
    }
    next();
};

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
import { UserPayload } from "../types/UserPayload";

//decode Access Token
export const autheticateUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/auth')) {
        return next();
    }
    const authHeader = req.headers['authorization'];
    
    if (authHeader) {
        const [scheme, token] = authHeader.split(' ');
        if (scheme === 'Bearer' && token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
                if (err) throw new CustomError('Invalid access token', 401); 
                req.user = user as (UserPayload);
            });

        } else {
            return res.status(401).json({ error: 'Invalid authorization header' });
        }
    } else {
        throw new CustomError('No authorization header found', 401);
    }
    next();
};

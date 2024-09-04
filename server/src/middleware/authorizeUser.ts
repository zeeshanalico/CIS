import { Response, Request, NextFunction } from "express";
import { Role } from "../roles/roles";
import { CustomError } from "../utils/CustomError";

export default function authorizeUser(allowedRoles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRoles: Role[] | undefined = req.user?.roles; // Assuming roles are an array on req.user

        if (!userRoles || !userRoles.some(role => allowedRoles.includes(role))) {
            throw new CustomError('Access denied. Insufficient permissions.', 403);
        }
        next();
    };
}

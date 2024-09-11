import { Request, Response, NextFunction } from "express";
const { sendError } = require('../utils/responseUtils')
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log('errorHandlerMidleware', );
    sendError(res, err);
}
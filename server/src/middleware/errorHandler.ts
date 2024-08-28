import { Request, Response, NextFunction } from "express";
const { sendError } = require('../utils/responseUtils')
module.exports = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    sendError(res, err);
}
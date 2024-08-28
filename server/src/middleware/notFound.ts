const { sendError } = require('../utils/responseUtils')
import { CustomError } from "../utils/CustomError";
import { Request, Response, NextFunction } from "express";
module.exports = (req: Request, res: Response, next: NextFunction) => {
    throw new CustomError('Api Not Found', 404);
}
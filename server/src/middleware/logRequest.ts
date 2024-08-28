import { Request, Response, NextFunction } from "express";
const loggerService = require('../logger/loggerService');
module.exports = (req: Request, res: Response, next: NextFunction) => {
    loggerService.info(
        `Request: ${req.method} ${req.url} ${'\nBody:' + JSON.stringify(req.body, null, 2)}`,
        `logRequest`,
    );
    next();
}
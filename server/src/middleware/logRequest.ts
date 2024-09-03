import { Request, Response, NextFunction } from "express";
import loggerService from "../logger/loggerService";
const logRequest = (req: Request, res: Response, next: NextFunction) => {
    loggerService.info(
        `Request: ${req.method} ${req.url} ${'\nBody:' + JSON.stringify(req.body, null, 2)}`,
        `logRequest`,
    );
    next();
}
export default logRequest
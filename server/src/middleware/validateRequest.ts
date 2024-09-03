import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/responseUtils';
export const validateRequest = (schema: Joi.ObjectSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        
        sendError(res, error, error.details[0].message, 400);
        return;// if don't use return, it will go to next middleware that will cause ERR_HTTP_HEADERS_SENT/Cannot set headers after they are sent to the client
    }
    next();
};


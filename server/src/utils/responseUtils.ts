import express, { Request, Response } from 'express';
import { CustomError } from './CustomError';
const loggerService = require('../logger/loggerService')
/**
 * 
 * @param {Response} res - The Express response object.
 * @param {any} data - The data to send in the response.
 * @param {string} message - The error message.
 * @param {number} [statusCode=200] - The HTTP status code (default is 200).
 */
function sendSuccess<T>(res: Response, data: T, message?: string, statusCode: number = 200): void {
    loggerService.info(`Response: ${JSON.stringify(res, null, 2)}`, `responseUtils`);
    res.status(statusCode).json({
        success: true,
        data,
    });
}

/**
//  * @param {Response} res - The Express response object.
//  * @param {unknown} err - The error object.
//  * @param {string} message - The error message.
//  * @param {number} [statusCode=500] - The HTTP status code (default is 500).
//  */
function sendError(res: Response, err: unknown, message?: string, statusCode: number = 500): void {
    loggerService.error(
        `Error ${statusCode}: ${JSON.stringify({ err })}`,
        err instanceof Error ? err.stack : '',
        'responseUtils',
    );
    if (err instanceof CustomError) {
        res.status(err.status).json({
            success: false,
            error: err.message,
        });
        return;
    }
    else if (err instanceof Error) {
        res.status(statusCode).json({
            success: false,
            error: err.message,
        });
        return;
    } else {
        res.status(statusCode).json({
            success: false,
            error: "Internal Server Error",
        });
        return;
    }
}

module.exports = {
    sendSuccess,
    sendError,
};

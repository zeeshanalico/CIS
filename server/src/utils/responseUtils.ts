import express, { Request, Response } from 'express';
import { CustomError } from './CustomError';
import loggerService from '../logger/loggerService';

// type JSONSerializable =
//   | string
//   | number
//   | boolean
//   | null
//   | JSONSerializable[]
//   | { [key: string]: JSONSerializable };

/**
 * 
 * @param {Response} res - The Express response object.
 * @param {any} result - The result to send in the response.
 * @param {string} message - The error message.
 * @param {number} [statusCode=200] - The HTTP status code (default is 200).
 */
function sendSuccess<T>(res: Response, result: T, message: string | null = null, extraInfo?: any, statusCode: number = 200,): void {
    loggerService.info(`Response: ${JSON.stringify(result, null, 2)}`, `responseUtils`);
    res.status(statusCode).json({
        success: true,
        message,
        result,
        extraInfo
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
            result: null,
        });
        return;
    }
    else if (err instanceof Error) {
        res.status(statusCode).json({
            success: false,
            error: err.message,
            result: null,
        });
        return;
    } else {
        res.status(statusCode).json({
            success: false,
            error: "Internal Server Error",
            result: null,
        });
        return;
    }
}
export { sendSuccess, sendError };

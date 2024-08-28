import { createLogger, format, transports, Logger } from 'winston';
const fs = require('fs')
const path = require('path')
import 'winston-daily-rotate-file';
// Create logs directory if not exists
const logsDirectory = path.join(__dirname,'..', 'logs');
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

const dailyRotateFileTransport = (level: string) => new transports.DailyRotateFile({
    level,
    dirname: logsDirectory,
    filename: `%DATE%-${level}.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
});

const isProduction = process.env.NODE_ENV === 'production';

// Define an interface for the log format
interface LogFormat {
    timestamp: string;
    level: string;
    message: string;
    context?: string;
    trace?: string;
}

const loggerTransports = isProduction
    ? [
        dailyRotateFileTransport('info'),
        dailyRotateFileTransport('warn'),
        dailyRotateFileTransport('error'),
    ]
    : [
        new transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.align(),
                format.simple(),
                format.timestamp({
                    format: 'YYYY-MM-DD hh:mm:ss.SSS A', // 2022-01-25 03:23:10.350 PM
                }),
                format.printf((info) => {
                    const { timestamp, level, message, context, trace } = info as LogFormat;
                    return `${timestamp} [${context}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
                }),
            ),
        })
    ];

export const logger: Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.errors({ stack: true }), // capture stack trace
        format.splat(), // for printf format interpolation
        format.json(),
    ),
    transports: loggerTransports,
});

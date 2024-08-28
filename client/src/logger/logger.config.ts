import { createLogger, format, transports, Logger } from 'winston';

interface LogFormat {
    timestamp: string;
    level: string;
    message: string;
    context?: string;
    trace?: string;
}

const loggerTransports = [
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

const { logger } = require('./logger.config');
class LoggerService {
    info(message: string, context?: string) {
        logger.info(this.formatMessage(message, context), { context });
    }

    error(message: string, trace: string|undefined, context?: string) {
        logger.error(this.formatMessage(message, context, trace), { context });
        // logger.error(message,{ context, trace});
    }

    warn(message: string, context?: string) {
        logger.warn(this.formatMessage(message, context), { context });
    }

    debug(message: string, context?: string) {
        logger.debug(this.formatMessage(message, context), { context });
    }

    private formatMessage(message: string, context?: string, trace?: string): string {
        const formattedTrace = trace ? this.formatTrace(trace) : '';
        // const contextPart = context ? `[${context}] ` : '';
        return `${message}${formattedTrace}`;
    }

    private formatTrace(trace: string): string {
        // Box-style formatting for stack trace
        const border = '='.repeat(50);
        return `\n${border}\nStack Trace:\n${trace}\n${border}\n`;
    }
}

export default new LoggerService();
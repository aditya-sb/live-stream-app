import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class Logger implements LoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'combined.log' }),
            ],
        });
    }

    log(message: string): void {
        this.logger.info(message);
    }

    error(message: string, trace: string): void {
        this.logger.error(`${message} - ${trace}`);
    }

    warn(message: string): void {
        this.logger.warn(message);
    }

    debug(message: string): void {
        this.logger.debug(message);
    }

    verbose(message: string): void {
        this.logger.verbose(message);
    }
}

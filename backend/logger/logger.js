import { createLogger, format, transports } from 'winston';
import LokiTransport from 'winston-loki';

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = () => {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            myFormat
        ),
        transports: [
            new LokiTransport({
                host: "http://loki:3100",
                labels: { service: 'fakeapi-backend' }
            }),
            new transports.Console()
        ]
    });
};   

export default logger();
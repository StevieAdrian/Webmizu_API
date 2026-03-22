import morgan from 'morgan';
import { Request, Response } from 'express';
import config from './index';
import logger from '../utils/logger';

morgan.token('message', (_req: Request, res: Response) => res.locals.errorMessage || '');

const getIpFormat = (): string => (config.env === 'production' ? ':remote-addr - ' : '');
const successFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successFormat, {
  skip: (_req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorFormat, {
  skip: (_req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

export { successHandler, errorHandler };

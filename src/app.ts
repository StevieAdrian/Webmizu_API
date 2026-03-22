import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import config from './config';
import { successHandler, errorHandler as morganErrorHandler } from './config/morgan';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';

const app = express();

// Request logging (morgan)
if (config.env !== 'test') {
  app.use(successHandler);
  app.use(morganErrorHandler);
}

app.use(helmet());

app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors({ origin: config.cors.origin }));

app.use(hpp());

app.use(rateLimiter);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1', routes);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

export default app;

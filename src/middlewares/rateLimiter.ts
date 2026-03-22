import rateLimit from 'express-rate-limit';
import config from '../config';

const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { code: 429, message: 'Too many requests, please try again later' },
});

export default rateLimiter;

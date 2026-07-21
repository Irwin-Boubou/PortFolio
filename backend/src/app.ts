import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import { api } from './routes';
import { errorHandler, notFound } from './middleware/error';
import { env } from './config/env';

export function createApp() {
  const app = express();
  app.set('trust proxy', 1); // Railway/Render sit behind a proxy (needed for rate-limit + secure cookies)

  app.use(helmet());
  app.use(cors({
    origin: [env.frontendUrl, 'http://localhost:3000'],
    credentials: true, // allow the HttpOnly refresh-token cookie
  }));
  app.use(cookieParser());
  app.use(compression());
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan(env.isProd ? 'combined' : 'dev'));

  app.get('/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
  app.use('/api/v1', api);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

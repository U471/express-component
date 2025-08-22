import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import routes from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import logger from './config/logger.js';

import swaggerDocs from './docs/swagger.js'; 

const app = express();

// Core middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// HTTP logging
app.use(morgan('dev'));

// Basic rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/v1/auth', authLimiter);

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/v1', routes);

// Swagger Docs
swaggerDocs(app);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;

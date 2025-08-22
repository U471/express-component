import logger from '../config/logger.js';
import { AppError } from '../utils/AppError.js';

export const errorHandler = (err, req, res, next) => {
  // Normalize to AppError
  let error = err instanceof AppError ? err : new AppError(err.message || 'Internal Server Error', err.statusCode || 500);

  // Log structured error
  logger.error('Request failed', {
    method: req.method,
    url: req.originalUrl,
    statusCode: error.statusCode,
    message: error.message,
    details: error.details,
    stack: error.stack
  });

  const payload = {
    success: false,
    message: error.message,
    ...(Object.keys(error.details || {}).length ? { details: error.details } : {})
  };

  res.status(error.statusCode || 500).json(payload);
};

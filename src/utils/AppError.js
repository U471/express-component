export class AppError extends Error {
  constructor(message, statusCode = 500, details = {}) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

// Helper creators
export const BadRequest = (msg = 'Bad Request', details = {}) => new AppError(msg, 400, details);
export const Unauthorized = (msg = 'Unauthorized', details = {}) => new AppError(msg, 401, details);
export const Forbidden = (msg = 'Forbidden', details = {}) => new AppError(msg, 403, details);
export const NotFoundErr = (msg = 'Not Found', details = {}) => new AppError(msg, 404, details);
export const Conflict = (msg = 'Conflict', details = {}) => new AppError(msg, 409, details);
export const Unprocessable = (msg = 'Unprocessable Entity', details = {}) => new AppError(msg, 422, details);
